import axios from "axios";
import { Escola } from "../interfaces";
import { configDotenv } from "dotenv";
configDotenv();

const api = process.env.API_QEDU as string;
export async function list(tentativas: number = 3): Promise<Escola[]> {
  const url = "http://api.qedu.org.br/v1/escolas/";
  const headers = {
    Authorization: `Bearer ${api}`,
    "Content-Type": "application/json",
  };
  const dados = {
    cidade_id: 2303501,
  };

  let tentativa = 0;
  while (tentativa < tentativas) {
    try {
      const response = await axios.get(url, { params: dados, headers });
      return response.data["data"] as Escola[];
    } catch (error: any) {
      if (error.code === "ETIMEDOUT" && tentativa < tentativas - 1) {
        console.log(`Request deu TimeOut, Tentativas ${tentativa + 1}`);
        tentativa++;
        continue;
      }
      throw error;
    }
  }

  throw Error("Número de tentativas de request à API atingido.");
}
