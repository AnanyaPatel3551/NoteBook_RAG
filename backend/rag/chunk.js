const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");

/**
 * Splits text into chunks.
 * We use a chunk size of 1000 characters and an overlap of 200.
 * WHY: This size ensures that chunks are large enough to contain complete
 * thoughts or paragraphs, while the overlap prevents splitting important
 * context mid-sentence, preserving the semantic meaning across chunk boundaries.
 */
async function chunkText(text) {
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    const chunks = await textSplitter.createDocuments([text]);
    return chunks;
}

module.exports = { chunkText };
