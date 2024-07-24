import { Escola } from "../interfaces";
import { Request, Response } from "express";
import { list } from "../services/EscolaService";

export const listEscolas = async (req: Request, res: Response) => {
  let dados: Escola[] = await list();
  return res.json(dados);
};

