import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
