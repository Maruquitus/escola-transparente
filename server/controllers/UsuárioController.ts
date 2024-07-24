import { Response, Request } from "express";
import { novo } from "../services/UsuárioService";

export const novoUsuário = async (req: Request, res: Response) => {
  let resultado;
  if (req.body.confirmPassword !== req.body.password)
    resultado = Error("Confirmação de senha incorreta. Tente novamente.");
  if (!resultado && req.body.password.length < 8)
    resultado = Error("Senha muito curta! Mínimo de 8 caracteres.");
  if (!resultado)
    resultado = await novo(req.body.username, req.body.password);
  if (resultado instanceof Error) {
    res.redirect(`/cadastro?erro=${resultado.message}`);
  } else {
    res.redirect("/home");
  }
};
