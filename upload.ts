import { database, getDB } from "./db";
import { Request, Response } from "express";
import { uploadMiddleware } from "./middleware/upload";

const GridFSBucket = require("mongodb").GridFSBucket;

const baseUrl = "http://localhost:3001/arquivos/";

const uploadFiles = async (req: Request, res: Response) => {
  const upload = await uploadMiddleware;
  try {
    if (!req.body) return res.send({ message: "Erro no formulário" });

    const resultado = await upload(req, res);

    return res.status(200).send({
      filename: "",
      message: "O arquivo foi enviado.",
    });
  } catch (error) {
    return res.status(500).send({
      message: `${error}`,
    });
  }
};

const getListFiles = async (req: Request, res: Response) => {
  try {
    await getDB();

    const images = database.collection("Imagens.files");
    const cursor = images.find({});
    const fileInfos = await cursor.toArray();

    if (fileInfos.length === 0) {
      return res.status(500).send({
        message: "Nenhum arquivo encontrado!",
      });
    }

    const formattedFileInfos = fileInfos.map((doc: any) => ({
      name: doc.filename,
      url: baseUrl + doc.filename,
    }));

    return res.status(200).send(formattedFileInfos);
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const download = async (req: Request, res: Response) => {
  try {
    await getDB();

    const bucket = new GridFSBucket(database, {
      bucketName: "Imagens",
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", function (data: any) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err: any) {
      return res
        .status(404)
        .send({ message: "Não foi possível baixar a imagem!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export { uploadFiles, getListFiles, download };
