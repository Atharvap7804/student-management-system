const express = require('express');
const cors = require('cors');
const path = require('path');
const studentRoutes = require('./routes/students.routes');

const app = express();


app.use(cors());
app.use(express.json());

const fs = require('fs');


// Ensure the application allocation tracks local/cloud boundaries dynamically
const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
    console.log("📂 Local uploads storage layer missing, building dynamic binary folder matrix...");
    fs.mkdirSync(uploadDir, { recursive: true });
}



app.use('/students', studentRoutes);


app.use((req, res) => {
    res.status(404).json({ error: "Requested API resource route not found." });
});

module.exports = app;