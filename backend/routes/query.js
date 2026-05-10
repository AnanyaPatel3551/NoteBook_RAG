const express = require("express");
const router = express.Router();
const { retrieveAndAnswer } = require("../rag/retrieve");

router.post("/", async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }

        const result = await retrieveAndAnswer(query);
        res.json(result);
    } catch (error) {
        console.error("Query error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
