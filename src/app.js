const express = require('express');
const cors = require('cors');
const path = require('path');
const studentRoutes = require('./routes/students.routes');

const app = express();


app.use(cors());
app.use(express.json());

// Serve uploads folder 
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.use('/students', studentRoutes);


app.use((req, res) => {
    res.status(404).json({ error: "Requested API resource route not found." });
});

module.exports = app;