const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const qdrantClient = new QdrantClient({ 
    url: process.env.QDRANT_URL || "http://127.0.0.1:6333",
    apiKey: process.env.QDRANT_API_KEY || undefined
});

module.exports = { qdrantClient };
