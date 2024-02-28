import { Request, Response } from 'express';

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

const port = process.env.PORT || 3001;
app.listen(port, () => {console.log(`Server is running on port ${port}`)});

// Fazer com que o Node sirva os arquivos do app em React criado
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Lidar com as solicitações GET feitas à rota /api
app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Olá!" });
});

// Todas as outras solicitações GET não tratadas retornarão nosso app em React
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});