import {
  ServerApiVersion,
  MongoClient,
  Collection,
  Db,
  Document,
  ObjectId,
} from "mongodb";
import { configDotenv } from "dotenv";
import { pbkdf2 } from "crypto";

configDotenv();
const URL_BD = process.env.URL_BD as string;
const SALT = process.env.SALT as string;

const credentials = process.env.CERT_LOCATION as string;
const client = new MongoClient(URL_BD, {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1,
});
let database: Db,
  reclamações: Collection<Document>,
  usuários: Collection<Document>,
  imagens: Collection<Document>,
  curtidas: Collection<Document>;

async function run() {
  try {
    await client.connect();
    database = client.db("db");
    reclamações = database.collection("Reclamações");
    usuários = database.collection("Usuários");
    curtidas = database.collection("Curtidas");
    imagens = database.collection("Imagens.files");
    console.log("Conexão com a base de dados realizada com êxito!");
  } catch (Exception) {
    console.log(Exception);
  }
}

run().catch(console.dir);

async function getDB() {
  if (reclamações == undefined) {
    await run();
    return database;
  }
  return null;
}

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

export async function getUsuário(usuário: string) {
  return usuários.findOne({ usuário: usuário });
}

export async function getReclamaçõesEscola(escola: string, cidadeId: number) {
  return reclamações.find({ escola: escola, cidadeId: cidadeId }).toArray();
}

function hashSenha(senha: string) {
  return new Promise((resolve, reject) => {
    pbkdf2(senha, SALT, 310000, 32, "sha256", (err, hashSenha) => {
      if (err) return reject(err);
      resolve(hashSenha.toString("hex"));
    });
  });
}

export async function getReclamaçõesUsuário(usuário: ObjectId) {
  return reclamações.find({ usuário: usuário }).toArray();
}

export async function removerReclamação(id: ObjectId) {
  return await reclamações.deleteOne({ _id: id });
}

export async function novaReclamação(
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

export async function limparReclamações() {
  await reclamações.deleteMany({});
}

export async function limparImagens() {
  await imagens.deleteMany({});
}

function validarUsuário(usuário: string): boolean {
  const regex = /^[a-zA-Z0-9_]+$/;
  return regex.test(usuário);
}

function validarSenha(senha: string): boolean {
  const regex = /\s/;
  return !regex.test(senha);
}

export async function autenticarUsuário(usuário: string, senha: string) {
  const usuárioDoc = await getUsuário(usuário);
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

export async function mostrarReclamações() {
  return await reclamações.find({}).toArray();
}

export async function novoUsuário(usuário: string, senha: string) {
  if (validarUsuário(usuário) == false)
    return Error(
      "Nome de usuário inválido! Use apenas letras, números ou underscores."
    );
  if (validarSenha(senha) == false)
    return Error("Sua senha não pode conter espaços!");
  if ((await getUsuário(usuário)) == null) {
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

export { database, URL_BD, credentials, getDB };
