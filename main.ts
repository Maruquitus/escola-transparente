import { Request, Response, NextFunction } from "express";
import { AxiosError } from "axios";
//import { contarDocs } from "./db";
import axios from "axios";
import dotenv from "dotenv";
const express = require("express");
const path = require("path");
const app = express();
dotenv.config();

app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://escola-transparente.onrender.com'];
  const origin = req.headers.origin as string;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  next();
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Fazer com que o Node sirva os arquivos do app em React criado
app.use(express.static(path.resolve(__dirname, "../client/build")));

//Interação com a API do QEdu
interface Escola {
  inep_id: number;
  cidade_id: number;
  estado_id: number;
  dependencia_id: number;
  dependencia: string;
  localizacao_id: number;
  localizacao: string;
  situacao_funcionamento_id: number;
  situacao_funcionamento: string;
  nome: string;
  nome_prefixo: string;
  nome_padronizado: string;
  slug: string;
  bairro: string;
  endereco: string;
  cep: string;
  ddd: string;
  telefone: string;
  telefone_publico: string;
  email: string;
  lat: number;
  long: number;
}

const api = process.env.API_QEDU as string;

async function getEscola(codigo_inep: string, nome: string): Promise<Escola> {
  const url = "https://api.qedu.org.br/v1/escolas/";
  const headers = {
    Authorization: `Bearer ${api}`,
    "Content-Type": "application/json",
  };

  const dados = {
    inep_id: codigo_inep,
  };

  const response = await axios.get(url, { params: dados, headers, timeout: 1 });
  return response.data as Escola;
}

async function getEscolas(retries: number = 3): Promise<Escola[]> {
  const url = "https://api.qedu.org.br/v1/escolas/";
  const headers = {
    Authorization: `Bearer ${api}`,
    "Content-Type": "application/json",
  };
  const dados = {
    cidade_id: 2303501,
  };

  let attempt = 0;
  while (attempt < retries) {
    try {
      const response = await axios.get(url, { params: dados, headers });
      return response.data["data"] as Escola[];
    } catch (error: any) {
      if (error.code === 'ETIMEDOUT' && attempt < retries - 1) {
        console.log(`Request deu TimeOut, Tentativas ${attempt + 1}`);
        attempt++;
        continue;
      }
      throw error;
    }
  }

  throw Error('Número de tentativas de request à API atingido.');
}



// Lidar com as solicitações GET feitas à rota /api
app.get("/api", async (req: Request, res: Response) => {
  let dados: Escola[] = await getEscolas();
  res.json(dados);
});

// Contar documentos da BD
/*app.get("/api/contarDocs", async (req: Request, res: Response) => {
  let resultado: number = await contarDocs();
  res.json(resultado);
});*/

// Todas as outras solicitações GET não tratadas retornarão nosso app em React
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
