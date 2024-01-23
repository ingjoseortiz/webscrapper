import { Router } from "express";
import {
  getImparcial,
  getXataka,
  getPromodescuentos,
  getLinkedIn,
} from "../controllers/webscraping.controller.js";

const router = new Router();

router.get("/imparcial", getImparcial);
router.get("/promodescuentos", getPromodescuentos);
router.get("/xataka", getXataka);
router.get("/linkedin", getLinkedIn);

export default router;
