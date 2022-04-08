import mongoose from 'mongoose';
const { Schema } = mongoose;

const scoreSchema = new Schema(
  {
    score: { type: Number, required: true },
    socketId: { type: String, required: true },
    userName: {
      type: String,
      required: true,
    },
    timeGuessingInSeconds: { type: Number, required: true, default: 0, min: 0 },
  },
  {
    timestamps: false,
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export const scoreModel = mongoose.model('Score', scoreSchema);
