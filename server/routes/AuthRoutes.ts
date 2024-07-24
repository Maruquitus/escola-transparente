import { Router } from "express";
import {
  autenticar,
  checkAutenticado,
  logout,
} from "../controllers/AuthController";
import { RequestAutenticado } from "../interfaces";
const router = Router();

router.post(
  "/login/autenticar",
  (req: RequestAutenticado, res: any, next: any) => {
    autenticar(req, res, next);
  }
);
router.post("/api/sair", (req: RequestAutenticado, res: any) => logout(req, res));
router.get("/api/checkAutenticado", (req: RequestAutenticado, res: any) =>
  checkAutenticado(req, res)
);

export default router;
