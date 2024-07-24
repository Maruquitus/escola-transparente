import { Request, Response } from "express";
import { limpar } from "../services/FileService";

export const limparImagens = async (req: Request, res: Response) => {
  await limpar();
  res.status(200).send({ mensagem: "Imagens limpas!" });
};