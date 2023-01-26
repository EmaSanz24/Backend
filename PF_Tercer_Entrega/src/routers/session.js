import { Router } from "express";

import { logout, root } from "../controllers/sessionController.js";
const router = Router();

router.get("/root", root);
router.get("/logout", logout);

export { router };
