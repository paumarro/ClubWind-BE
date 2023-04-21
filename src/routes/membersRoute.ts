import { Router } from "express";
import MemberController, {
  createMemberController,
  deleteMemberController,
  getAllMembersController,
  getMemberController,
  getMemberEventsController,
} from "../controllers/membersController";
import {
  validateMember,
  handleValidationError,
} from "../middlewares/validations";
import { isAdmin, isAuthenticated } from "../middlewares/session";

const memberController = new MemberController();


const membersRoute: Router = Router();

membersRoute.get("/", isAuthenticated, getAllMembersController);

membersRoute.get("/:id", isAuthenticated, getMemberController);

membersRoute.delete("/:id", isAdmin, deleteMemberController);

membersRoute.get("/:id/events", isAuthenticated, getMemberEventsController);

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
  memberController.update
);
 
export default membersRoute;