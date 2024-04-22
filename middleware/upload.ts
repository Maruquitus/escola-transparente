import util from "util";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { getDB } from "../db";
import { Request } from "express";

const dbPromise = getDB();

const uploadMiddleware = dbPromise
  .then((db: any) => {
    const storage = new GridFsStorage({
      db: db,
      file: (req: Request, file: Express.Multer.File) => {
        if (!file) {
          throw new Error("Nenhum arquivo especificado");
        }

        if (file == undefined) {
          throw new Error("Você deve escolher um arquivo.");
        }
        if (!file.mimetype.startsWith("image/")) {
          throw new Error("Apenas imagens podem ser enviadas!");
        }


        return {
          filename: `${Date.now()}-${file.originalname}`,
          bucketName: "Imagens",
        };
      },
    });

    const upload = multer({ storage: storage }).single("file");
    return util.promisify(upload);
  })
  .catch((error: any) => {
    console.error("Erro estabelecendo uma conexão ao MongoDB:", error);
    throw error;
  });

export { uploadMiddleware };
