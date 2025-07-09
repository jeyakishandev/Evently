import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
} from "../controllers/eventController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", authMiddleware, createEvent);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);
router.post("/:id/join", authMiddleware, joinEvent);
router.delete("/:id/leave", authMiddleware, leaveEvent);

export default router;
