import express from "express";
import TransactionController from "../api/controllers/transaction.controller";

const router = express.Router();

router.put('/api/transaction/transfer', TransactionController.P2P);

export { router as transactionRoutes };
