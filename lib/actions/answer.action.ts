"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";

export async function getAllAnswers(params: GetAnswersParams) {
  try {
    connectDB();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectDB();

    const { content, author, question, path } = params;
    //
    // const newAnswer = Answer({ content, author, question, path });
    const newAnswer = await Answer.create({ content, author, question, path });

    // Add the answer to the question's answer qrray
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
