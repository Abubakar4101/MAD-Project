const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyA2asrrbHrBS62ETYhBFyndG1svdOoZLEk");

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = 'I am building a job seeker app. I have to show the related job categories based on preferred job titles. You have to give me the 5 categories of full stack developer in this format: "<category1>", "<category2>", "<category3>", "<category4>", "<category5>". Note: just write the categories, no numbering';
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
