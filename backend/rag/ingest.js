const fs = require("fs");
const pdfParseImport = require("pdf-parse");
const pdfParse = typeof pdfParseImport === 'function' ? pdfParseImport : pdfParseImport.PDFParse;
const { chunkText } = require("./chunk");
const { generateEmbeddings } = require("./embed");
const { qdrantClient } = require("../config/qdrant");
const crypto = require("crypto");

const COLLECTION_NAME = "rag_documents";

async function initCollection() {
    const collections = await qdrantClient.getCollections();
    const exists = collections.collections.some(c => c.name === COLLECTION_NAME);
    if (!exists) {
        await qdrantClient.createCollection(COLLECTION_NAME, {
            vectors: {
                size: 768, // size for Google Gemini text-embedding-004
                distance: "Cosine"
            }
        });
    }
}

async function ingestFile(filePath, mimeType) {
    let rawText = "";

    if (mimeType === "application/pdf") {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        rawText = data.text;
    } else {
        rawText = fs.readFileSync(filePath, "utf-8");
    }

    if (!rawText || rawText.trim().length === 0) {
        throw new Error("Could not extract any text from the document.");
    }

    // 1. Chunking
    const chunks = await chunkText(rawText);
    const texts = chunks.map(c => c.pageContent);

    // 2. Embedding
    const embeddings = await generateEmbeddings(texts);

    // 3. Storing in Qdrant
    await initCollection();

    const points = chunks.map((chunk, i) => ({
        id: crypto.randomUUID(),
        vector: embeddings[i],
        payload: {
            text: chunk.pageContent,
            source: filePath
        }
    }));

    await qdrantClient.upsert(COLLECTION_NAME, {
        wait: true,
        points: points
    });

    return {
        message: "File ingested successfully",
        chunksProcessed: points.length
    };
}

module.exports = { ingestFile };
