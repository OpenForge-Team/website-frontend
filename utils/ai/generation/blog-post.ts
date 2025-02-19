"use server";
import Groq from "groq-sdk";
const groq = new Groq({
  apiKey: process.env["GROQ_API_KEY"],
});

export async function generateBlogPost(
  length: number,
  subject: string,
  messages: string[]
) {
  const prompt = `Write a blog post about ${subject} based on these user messages:
${messages.join('\n')}

Requirements:
- The blog post should be approximately ${length} words
- Use a professional and engaging tone
- Include insights from the user messages
- Structure the post with clear sections
- Add a compelling title
- Format in markdown

Do not mention that this was AI-generated or reference the source messages directly.`;

  const response = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.1-8b-instant",
    temperature: 0.7,
    max_tokens: length * 4, // Approximate tokens needed for the word count
    top_p: 0.9,
  });

  return response.choices[0]?.message?.content || "Failed to generate blog post";
}
