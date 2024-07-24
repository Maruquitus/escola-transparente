import { get } from "./UsuárioService";
import { hashSenha } from "../utils/functions";

export async function autenticarUsuário(usuário: string, senha: string) {
  const usuárioDoc = await get(usuário);
  const usuárioExiste = usuárioDoc != null;
  const msg = "Usuário e/ou senha inválidos!";
  if (usuárioExiste) {
    //Checar hash da senha
    const hash = await hashSenha(senha);
    const hashCadastrado = usuárioDoc.senha;
    if (hash === hashCadastrado) {
      return usuárioDoc;
    } else {
      return Error(msg);
    }
  } else {
    return Error(msg);
  }
}
