const { qdrantClient } = require("../config/qdrant");
const { generateQueryEmbedding } = require("./embed");
const { chatModel } = require("../config/gemini");
const { PromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");

const COLLECTION_NAME = "rag_documents";

const RAG_TEMPLATE = `You are a helpful AI assistant. Answer the user's question based STRICTLY on the context provided below. 
If the context does not contain the answer, say exactly: "Not found in document". Do not hallucinate or use outside knowledge.

Context:
{context}

Question: {question}

Answer:`;

async function retrieveAndAnswer(query) {
    // 1. Embed query
    const queryVector = await generateQueryEmbedding(query);

    // 2. Retrieve top-k chunks
    const searchResults = await qdrantClient.search(COLLECTION_NAME, {
        vector: queryVector,
        limit: 4, // Retrieve top 4 chunks
    });

    if (searchResults.length === 0) {
        return { answer: "Not found in document", context: [] };
    }

    // 3. Prepare Context
    const contextText = searchResults.map(res => res.payload.text).join("\n\n---\n\n");

    // 4. Generate Answer via LLM
    const prompt = PromptTemplate.fromTemplate(RAG_TEMPLATE);
    
    const chain = prompt.pipe(chatModel).pipe(new StringOutputParser());
    
    const answer = await chain.invoke({
        context: contextText,
        question: query
    });

    return { answer, context: searchResults.map(res => res.payload.text) };
}

module.exports = { retrieveAndAnswer };
