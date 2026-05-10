const express = require("express");
const router = express.Router();
const multer = require("multer");
const { ingestFile } = require("../rag/ingest");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const filePath = path.join(__dirname, "..", req.file.path);
        
        // Ingest the file to Qdrant
        const result = await ingestFile(filePath, req.file.mimetype);

        // Cleanup temp file
        fs.unlinkSync(filePath);

        res.json({ success: true, ...result });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
