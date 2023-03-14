import { Router } from 'express'
import {
  createMemberController,
  deleteMemberController,
  getAllMembersController,
  getMemberController,
  searchAllMembersController,
  updateMemberController
} from '../controllers/membersController'
import { validateMember, handleValidationError } from '../validations/validations'



const membersRoute: Router = Router()

membersRoute.get('/search', searchAllMembersController)
membersRoute.get('/', getAllMembersController)
membersRoute.get('/:id', getMemberController)
membersRoute.post('/', validateMember, handleValidationError, createMemberController)
membersRoute.delete('/:id', deleteMemberController)
membersRoute.put('/:id', validateMember, handleValidationError, updateMemberController)

export default membersRoute