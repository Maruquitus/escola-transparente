import { download, uploadFiles, getListFiles } from "../upload";
import {Router} from "express";
const router = Router();

router.post("/upload", uploadFiles);
router.get("/arquivos/:name", download);

if (process.env.IS_PRODUCTION == "false") {
  router.post("/limparImagens", );
  router.get("/arquivos", getListFiles);
}

export default router;