import express from "express";
import AccountController from "../api/controllers/account.controller";

const router = express.Router();

router.get('/api/account/', AccountController.get);
router.get("/api/account/:id", AccountController.getById);
router.get("/api/account/balance/:id", AccountController.getBalance);

export { router as accountRoutes };
