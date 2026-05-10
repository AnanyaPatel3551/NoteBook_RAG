const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const uploadRouter = require("./routes/upload");
const queryRouter = require("./routes/query");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.use("/api/upload", uploadRouter);
app.use("/api/query", queryRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
