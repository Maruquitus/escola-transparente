import { usuários } from "../config/db";
import { validarUsuário, validarSenha } from "../utils/functions";
import { hashSenha } from "../utils/functions";

export async function get(usuário: string) {
  return usuários.findOne({ usuário: usuário });
}

export async function novo(usuário: string, senha: string) {
  if (validarUsuário(usuário) == false)
    return Error(
      "Nome de usuário inválido! Use apenas letras, números ou underscores."
    );
  if (validarSenha(senha) == false)
    return Error("Sua senha não pode conter espaços!");
  if ((await get(usuário)) == null) {
    //Gerar um hash com da senha escolhida
    const resultado = await hashSenha(senha);
    if (resultado instanceof Error) {
      return Error("Erro no hash da senha!");
    }
    //Adicionar o usuário na base de dados
    await usuários.insertOne({ usuário: usuário, senha: resultado });
    return { message: "Usuário criado com sucesso!" };
  } else {
    return Error("Já existe um usuário com esse nome!");
  }
}
