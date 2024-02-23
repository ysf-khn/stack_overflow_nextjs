"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
// import User from "@/database/user.model";



export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectDB();

    const { content, author, question, path } = params;

    const newAnswer = new Answer({ content, author, question, path });
    // const answer = await Answer.create({ content, author, question, path });

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
