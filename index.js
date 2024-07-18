import express from 'express';
import qr from 'qr-image';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Utility to get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Parse JSON bodies
app.use(bodyParser.json());

// Handle POST request to generate QR code
app.post('/api/generate-qr', (req, res) => {
    const url = req.body.url;
    if (url) {
        const qrPng = qr.image(url, { type: 'png' });
        res.setHeader('Content-Type', 'image/png');
        qrPng.pipe(res);
    } else {
        res.status(400).send('Invalid URL');
    }
});

// Serve index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
