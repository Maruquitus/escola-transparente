import {imagens} from "../config/db";

export async function limpar() {
  await imagens.deleteMany({});
}