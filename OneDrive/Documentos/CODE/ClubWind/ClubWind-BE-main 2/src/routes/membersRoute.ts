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
import { isAdmin } from "../middlewares/session";

const membersRoute: Router = Router();

membersRoute.get("/", getAllMembersController);

membersRoute.get("/:id", getMemberController);

membersRoute.delete("/:id", isAdmin, deleteMemberController);

membersRoute.get("/:id/events", getMemberEventsController)


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
