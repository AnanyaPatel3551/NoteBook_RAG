const { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });
require("dotenv").config(); // Default look

console.log("--- Debug: Gemini Config ---");
console.log("GOOGLE_API_KEY detected:", process.env.GOOGLE_API_KEY ? "YES" : "NO");
console.log("----------------------------");

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "text-embedding-004",
});

const chatModel = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-1.5-flash",
    temperature: 0
});

module.exports = { embeddings, chatModel };
