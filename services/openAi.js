import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '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',
});

export async function getJobTypes(query) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `I am adding job recommendation categories related to ${query}. Give me 5 categories in this format: "Category-1", "Category-2", ..., "Category-5".` },
      ],
    });

    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
  }
}
