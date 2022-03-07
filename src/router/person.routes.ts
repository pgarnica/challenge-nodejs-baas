import express from "express";
import personController from "../api/controllers/person.controller";

const router = express.Router();

router.get('/api/person/', personController.get);
router.get("/api/person/:id", personController.getById);
router.post("/api/person", personController.post);
router.put('/api/person/:id', personController.put);
router.delete('/api/person/:id', personController.delete);

export { router as personRoutes };
