import { Router } from "express";
import {
  addMemberToEventController,
  createEventController,
  deleteEventController,
  getAllEventsController,
  getEventController,
  searchAllEventsController,
  updateEventController,
} from "../controllers/eventsController";
import { validateEvent } from "../middlewares/validations/validations";

const eventsRoute: Router = Router();

eventsRoute.get("/search", searchAllEventsController);
eventsRoute.get("/", getAllEventsController);
eventsRoute.get("/:id", getEventController);
eventsRoute.post("/", validateEvent, createEventController);
eventsRoute.delete("/:id", deleteEventController);
eventsRoute.put("/:id", validateEvent, updateEventController);
eventsRoute.post("/:eventId/members/:memberId", addMemberToEventController);
export default eventsRoute;
