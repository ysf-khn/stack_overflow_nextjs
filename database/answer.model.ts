import { Schema, Document, models, model } from "mongoose";

export interface IAnswer extends Document {
  content: string;
  question: Schema.Types.ObjectId;
  createdAt: Date;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
}

const AnswerSchema = new Schema({
  content: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  createdAt: { type: Date, default: Date.now },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
