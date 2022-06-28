/* eslint-disable no-console */
// @packages
import { NextApiRequest, NextApiResponse } from 'next';

// @scripts
import EntryModel from '../../../models/entry';
import { Entry } from '../../../interfaces';
import { connect, disconnect } from '../../../database/db';

interface Data {
  message: string
}

const getEntries = async (res: NextApiResponse<Data | Entry[]>) => {
  await connect();

  const entries = await EntryModel.find().sort({ createdAt: 'ascending' });

  await disconnect();

  return res.status(200).json(entries);
};

const addEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const newEntry = new EntryModel({ ...req.body.entry });

  try {
    await connect();
    await newEntry.save();
    await disconnect();

    return res.status(201).json(newEntry);
  } catch (error) {
    await disconnect();
    console.log(error);

    return res.status(500).json({ message: 'Error adding entry' });
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return addEntry(req, res);
    default:
      return res.status(404).json({ message: 'The endpoint does not exist' });
  }
}
