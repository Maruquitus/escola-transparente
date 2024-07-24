import { reclamações, curtidas } from "../config/db";
import { ObjectId } from "mongodb";

export async function checkCurtida(
  usuárioId: ObjectId,
  reclamaçãoId: ObjectId
) {
  return (
    (await curtidas.findOne({
      usuário: usuárioId,
      reclamação: reclamaçãoId,
    })) !== null
  );
}

export async function curtir(usuárioId: ObjectId, reclamaçãoId: ObjectId) {
  const curtido = await checkCurtida(usuárioId, reclamaçãoId);
  if (!curtido) {
    reclamações.updateOne({ _id: reclamaçãoId }, { $inc: { curtidas: 1 } });
    await curtidas.insertOne({
      usuário: usuárioId,
      reclamação: reclamaçãoId,
    });
  }
}

export async function descurtir(usuárioId: ObjectId, reclamaçãoId: ObjectId) {
  const curtido = await checkCurtida(usuárioId, reclamaçãoId);
  if (curtido) {
    reclamações.updateOne({ _id: reclamaçãoId }, { $inc: { curtidas: -1 } });
    await curtidas.deleteMany({
      usuário: usuárioId,
      reclamação: reclamaçãoId,
    });
  }
}

export async function getByEscola(escola: string, cidadeId: number) {
  return reclamações.find({ escola: escola, cidadeId: cidadeId }).toArray();
}

export async function getByUsuário(usuário: ObjectId) {
  return reclamações.find({ usuário: usuário }).toArray();
}

export async function remover(id: ObjectId) {
  return await reclamações.deleteOne({ _id: id });
}

export async function criar(
  escola: string,
  título: string,
  textoReclamação: string,
  fotos: string[],
  idUsuário?: ObjectId,
  cidadeId: number = 2303501
) {
  const data = new Date();
  let dados = {
    usuário: idUsuário,
    data: data,
    cidadeId: cidadeId,
    escola: escola.toUpperCase(),
    título: título,
    textoReclamação: textoReclamação,
    fotos: fotos, //Array com os nomes dos arquivos das fotos
    status: "Não respondida",
    curtidas: 0,
  };
  await reclamações.insertOne(dados);
  return { message: "Nova reclamação feita com sucesso!" };
}

export async function limpar() {
  await reclamações.deleteMany({});
}

export async function list() {
  return await reclamações.find({}).toArray();
}
