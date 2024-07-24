import { pbkdf2 } from "crypto";

const SALT = process.env.SALT as string;

export function validarUsuário(usuário: string): boolean {
  const regex = /^[a-zA-Z0-9_]+$/;
  return regex.test(usuário);
}

export function validarSenha(senha: string): boolean {
  const regex = /\s/;
  return !regex.test(senha);
}

export function hashSenha(senha: string) {
  return new Promise((resolve, reject) => {
    pbkdf2(senha, SALT, 310000, 32, "sha256", (err, hashSenha) => {
      if (err) return reject(err);
      resolve(hashSenha.toString("hex"));
    });
  });
}
