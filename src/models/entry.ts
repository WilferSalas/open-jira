// @packages
import mongoose, { Model, Schema } from 'mongoose';

// @scripts
import { Entry } from '../interfaces';

interface EntryProps extends Entry {}

const entrySchema = new Schema({
  createdAt: { type: Number },
  description: { type: String },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high'],
      message: '{VALUE} is not a valid value',
    },
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ['to-do', 'in-progress', 'done'],
      message: '{VALUE} is not a valid value',
    },
    required: true,
  },
  title: { type: String, required: true },
});

const EntryModel: Model<EntryProps> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;