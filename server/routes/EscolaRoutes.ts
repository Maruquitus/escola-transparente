import { Router } from "express";
import { listEscolas } from "../controllers/EscolaController";
const router = Router();

router.get("/api/escolas", listEscolas);

export default router;
