import { Router } from "express";
import {
  createMemberController,
  deleteMemberController,
  getAllMembersController,
  getMemberController,
  updateMemberController,
  getMemberEventsController
} from "../controllers/membersController";
import {
  validateMember,
  handleValidationError,
} from "../middlewares/validations/validations";
import { isAdmin, isAuthenticated } from "../middlewares/session";

const membersRoute: Router = Router();

membersRoute.get("/", isAuthenticated, getAllMembersController);

membersRoute.get("/:id", isAuthenticated, getMemberController);

membersRoute.delete("/:id", isAdmin, deleteMemberController);

membersRoute.get("/:id/events", isAuthenticated, getMemberEventsController)


membersRoute.post(
  "/",
  isAdmin,
  validateMember,
  handleValidationError,
  createMemberController
);

membersRoute.put(
  "/:id",
  isAdmin,
  validateMember,
  handleValidationError,
  updateMemberController
);

export default membersRoute;
