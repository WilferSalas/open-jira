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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Entry[]>,
) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    default:
      return res.status(404).json({ message: 'The endpoint does not exist' });
  }
}
