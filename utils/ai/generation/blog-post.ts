"use server";
import Groq from "groq-sdk";
const groq = new Groq({
  apiKey: process.env["GROQ_API_KEY"], // This is the default and can be omitted
});
export async function generateBlogPost(
  length: number,
  subject: string,
  messages: []
) {
    const response = await groq.chat.completions.create({messages:[{role:"user",content:}],model: "llama-3.1-8b-instant"})
}
