require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

// Bootstrap the HTTP server pipeline
app.listen(PORT, () => {
    console.log(`🚀 Automated modular server running smoothly on workspace port ${PORT}`);
});