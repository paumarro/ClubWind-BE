import { Router } from "express";
import {
  createClubController,
  deleteClubController,
  getAllClubsController,
  getClubController,
  searchAllClubsController,
  updateClubController,
} from "../controllers/clubsController";
import { validateClub } from "../middlewares/validations/validations";

const clubsRoute: Router = Router();

clubsRoute.get("/search", searchAllClubsController);
clubsRoute.get("/", getAllClubsController);
clubsRoute.get("/:id", getClubController);
clubsRoute.post("/", validateClub, createClubController);
clubsRoute.delete("/:id", deleteClubController);
clubsRoute.put("/:id", validateClub, updateClubController);

export default clubsRoute;
