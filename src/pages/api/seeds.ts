// @packages
import { NextApiRequest, NextApiResponse } from 'next';

// @scripts
import { connect, disconnect } from '../../database/db';

interface Data {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (process.env.NODE_ENV === 'production') {
    res.status(200).json({ message: 'You do not have access' });
  }

  await connect();

  await disconnect();

  res.status(200).json({ message: 'Process done correctly' });
}
