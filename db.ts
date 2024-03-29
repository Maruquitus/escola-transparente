import {
  ServerApiVersion,
  MongoClient,
  Collection,
  Db,
  Document,
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
  usuários: Collection<Document>;

async function run() {
  try {
    await client.connect();
    database = client.db("db");
    reclamações = database.collection("Reclamações");
    usuários = database.collection("Usuários");
  } catch (Exception) {
    console.log(Exception);
  }
}

async function getDB() {
  if (reclamações == undefined) {
    await run();
  }
}

async function contarDocs() {
  await getDB();
  return await reclamações.countDocuments({});
}

export async function getUsuário(usuário: string) {
  await getDB();
  return usuários.findOne({ usuário: usuário });
}

function hashSenha(senha: string) {
  return new Promise((resolve, reject) => {
    pbkdf2(senha, SALT, 310000, 32, "sha256", (err, hashSenha) => {
      if (err) return reject(err);
      resolve(hashSenha.toString("hex"));
    });
  });
}

export async function autenticarUsuário(usuário: string, senha: string) {
  const usuárioDoc = await getUsuário(usuário);
  const usuárioExiste = usuárioDoc != null;
  if (usuárioExiste) {
    //Checar hash da senha
    const hash = await hashSenha(senha);
    const hashCadastrado = usuárioDoc.senha;
    if (hash === hashCadastrado) {
      return usuárioDoc;
    }
    else {
      return Error('Senha inválida!');
    }
  }
  else {
    return Error('Usuário não cadastrado!')
  }
}

export async function novoUsuário(usuário: string, senha: string) {
  await getDB();
  if ((await getUsuário(usuário)) == null) {
    //Gerar um hash com da senha escolhida
    const resultado = await hashSenha(senha);
    if (resultado instanceof Error) {
      return Error("Erro no hash da senha!");
    }
    //Adicionar o usuário na base de dados
    await usuários.insertOne({ usuário: usuário, senha: resultado });
    return {message: "Usuário criado com sucesso!"}
  } else {
    return Error("Já existe um usuário com esse nome!");
  }
}

export { database, contarDocs };
run().catch(console.dir);
