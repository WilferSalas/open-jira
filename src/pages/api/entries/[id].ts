/* eslint-disable no-console */
// @packages
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

// @scripts
import EntryModel from '../../../models/entry';
import { connect, disconnect } from '../../../database/db';

const updateEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    await connect();

    const entryToUpdate = await EntryModel.findById(id);

    if (!entryToUpdate) {
      await disconnect();
      return res.status(400).json({ message: `There is no entry with that id: ${id}` });
    }

    const updatedEntry = await EntryModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { runValidators: true, new: true },
    );

    await disconnect();

    return res.status(201).json(updatedEntry);
  } catch (error) {
    await disconnect();
    console.log(error);

    return res.status(400).json({ message: 'Error updating entry' });
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `The id is not correct: ${id}` });
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);
    default:
      return res.status(400).json({ message: 'The endpoint does not exist' });
  }
}
