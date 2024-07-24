import { Router } from "express";
import multer from "multer";
import {
  apagarReclamação,
  checkCurtidaReclamação,
  curtirReclamação,
  descurtirReclamação,
  listReclamações,
  limparReclamações,
  loadReclamaçõesEscola,
  novaReclamação,
  loadReclamaçõesUsuário,
} from "../controllers/ReclamaçãoController";
import { RequestAutenticado } from "../interfaces";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.get("/api/curtido/:reclamacaoid", (req: RequestAutenticado, res: any) =>
  checkCurtidaReclamação(req, res)
);
router.post("/api/curtir/:reclamacaoid", (req: RequestAutenticado, res: any) =>
  curtirReclamação(req, res)
);
router.post(
  "/api/descurtir/:reclamacaoid",
  (req: RequestAutenticado, res: any) => descurtirReclamação(req, res)
);
router.get(
  "/api/reclamacoes/:cidadeId/:escola",
  (req: RequestAutenticado, res: any) => loadReclamaçõesEscola(req, res)
);
router.get("/api/reclamacoesUsuario/", (req: RequestAutenticado, res: any) =>
  loadReclamaçõesUsuário(req, res)
);
router.post(
  "/api/novaReclamacao",
  upload.array("fotos", 3),
  (req: RequestAutenticado, res: any) => novaReclamação(req, res)
);
router.post("/api/apagarReclamacao/:id", (req: RequestAutenticado, res: any) =>
  apagarReclamação(req, res)
);

if (process.env.IS_PRODUCTION == "false") {
  router.get("/api/listReclamacoes", (req, res) => listReclamações(req, res));
  router.post("/api/limparReclamacoes", (req, res) =>
    limparReclamações(req, res)
  );
}

export default router;
