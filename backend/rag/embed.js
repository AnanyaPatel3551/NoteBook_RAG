const { embeddings } = require("../config/gemini");

/**
 * Generates embeddings for an array of strings.
 */
async function generateEmbeddings(texts) {
    return await embeddings.embedDocuments(texts);
}

/**
 * Generates embedding for a single query string.
 */
async function generateQueryEmbedding(query) {
    return await embeddings.embedQuery(query);
}

module.exports = { generateEmbeddings, generateQueryEmbedding };
