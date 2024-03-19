import { ServerApiVersion, MongoClient, Collection, Db } from "mongodb";
import { configDotenv } from "dotenv";
configDotenv();
const URL_BD = process.env.URL_BD as string;

const credentials = process.env.CERT_LOCATION as string;
const client = new MongoClient(URL_BD, {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1,
});
let database: Db, collection: Collection<Document>;

async function run() {
  try {
    await client.connect();
    database = client.db("db");
    collection = database.collection("Reclamações");
  } catch(Exception) {
    console.log(Exception);
  }
}

async function getDB() {
    if (collection == undefined) {
        await run();
      }
}

async function contarDocs() {
  await getDB();
  return await collection.countDocuments({});
}

export { database, collection, contarDocs };
run().catch(console.dir);