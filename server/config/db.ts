import {
  ServerApiVersion,
  MongoClient,
  Collection,
  Db,
  Document,
} from "mongodb";

import { configDotenv } from "dotenv";
configDotenv();

const URL_BD = process.env.URL_BD as string;

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

export async function run() {
  try {
    await client.connect();
    database = client.db("db");
    reclamações = database.collection("Reclamações");
    usuários = database.collection("Usuários");
    curtidas = database.collection("Curtidas");
    imagens = database.collection("Imagens.files");
    console.log("Conexão com a base de dados realizada com êxito!");
    return database;
  } catch (Exception) {
    console.log(Exception);
  }
}

export { reclamações, usuários, curtidas, imagens, database };
