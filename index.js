import express from 'express';
import qr from 'qr-image';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Utility to get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/generate-qr', (req, res) => {
    const url = req.body.url;
    if (url) {
        const qrPng = qr.image(url, { type: 'png' });
        res.setHeader('Content-Type', 'image/png');
        qrPng.pipe(res);
    } else {
        res.status(400).send('Invalid URL');
    }
});

app.listen(process.env.PORT || port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
