const { QdrantClient } = require("@qdrant/js-client-rest");
require("dotenv").config({ path: "../.env" });

const qdrantClient = new QdrantClient({ 
    url: process.env.QDRANT_URL || "http://127.0.0.1:6333" 
});

module.exports = { qdrantClient };
