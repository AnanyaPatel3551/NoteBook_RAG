const yargs = require("yargs");
const { ingestFile } = require("./rag/ingest");
const { retrieveAndAnswer } = require("./rag/retrieve");

const argv = yargs
    .option("file", {
        alias: "f",
        description: "Path to the PDF or TXT file to ingest",
        type: "string",
    })
    .option("query", {
        alias: "q",
        description: "Question to ask the RAG system",
        type: "string",
    })
    .help()
    .alias("help", "h")
    .argv;

async function runCLI() {
    try {
        if (argv.file) {
            console.log(`Ingesting file: ${argv.file}...`);
            const mimeType = argv.file.toLowerCase().endsWith(".pdf") ? "application/pdf" : "text/plain";
            const result = await ingestFile(argv.file, mimeType);
            console.log("Ingestion result:", result);
        }

        if (argv.query) {
            console.log(`Querying: "${argv.query}"...`);
            const result = await retrieveAndAnswer(argv.query);
            console.log("\n--- ANSWER ---");
            console.log(result.answer);
            console.log("--------------\n");
            console.log("Sources:");
            result.context.forEach((c, i) => console.log(`[${i + 1}] ${c.substring(0, 100)}...`));
        }

        if (!argv.file && !argv.query) {
            console.log("Please provide --file or --query. Run 'node cli.js --help' for usage.");
        }
    } catch (error) {
        console.error("CLI Error:", error.message);
    }
}

runCLI();
