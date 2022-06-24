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

  res.status(200).json(entries);
};

const addEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const newEntry = new EntryModel({ ...req.body.entry });

  try {
    await connect();
    await newEntry.save();
    await disconnect();

    res.status(201).json(newEntry);
  } catch (error) {
    await disconnect();
    console.log(error);

    res.status(500).json({ message: 'Error adding entry' });
  }
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect();
    await disconnect();

    res.status(201).json({});
  } catch (error) {
    await disconnect();
    console.log(error);

    res.status(500).json({ message: 'Error updating entry' });
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Entry[]>,
) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return addEntry(req, res);
    case 'PUT':
      return updateEntry(req, res);
    default:
      return res.status(404).json({ message: 'The endpoint does not exist' });
  }
}
