import mongoose from 'mongoose';

const mongoConection = {
  isConected: 0,
};

export const connect = async () => {
  if (mongoConection.isConected) {
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConection.isConected = mongoose.connections[0].readyState;

    if (mongoConection.isConected) {
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || '');
  mongoConection.isConected = 1;
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') return;
  if (!mongoConection.isConected) return;

  await mongoose.disconnect();
  mongoConection.isConected = 0;
};
