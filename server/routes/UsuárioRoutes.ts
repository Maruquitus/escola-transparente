import { Router } from "express";
import { novoUsuário } from "../controllers/UsuárioController";

const router = Router();

router.post("/api/novoUsuario", (req, res) => novoUsuário(req, res));

export default router;
