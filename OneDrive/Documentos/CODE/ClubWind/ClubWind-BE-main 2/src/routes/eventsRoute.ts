import { Router } from "express";
import {
  addMemberToEventController,
  createEventController,
  deleteEventController,
  getAllEventsController,
  getEventController,
  getEventMembersController,
  updateEventController,
} from "../controllers/eventsController";
import { validateEvent } from "../middlewares/validations/validations";
import { isAdmin } from "../middlewares/session";

const eventsRoute: Router = Router();

eventsRoute.get("/", getAllEventsController);

eventsRoute.get("/:id", getEventController);

eventsRoute.post("/",isAdmin, validateEvent, createEventController);

eventsRoute.delete("/:id", deleteEventController);

eventsRoute.put("/:id",isAdmin, validateEvent, updateEventController);

eventsRoute.get("/:id/members", getEventMembersController)

//add validation
eventsRoute.post("/:eventId/members/:memberId", addMemberToEventController);

export default eventsRoute;
