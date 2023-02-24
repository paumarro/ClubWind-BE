import { Router } from 'express'
import {
  createMemberController,
  deleteMemberController,
  getAllMembersController as getAllMembersController,
  getMemberController,
  searchAllMembersController as searchAllMembersController,
  updateMemberController
} from '../controllers/membersController'


const membersRoute: Router = Router()

membersRoute.get('/search', searchAllMembersController)
membersRoute.get('/', getAllMembersController)
membersRoute.get('/:id', getMemberController)
membersRoute.post('/', createMemberController)
membersRoute.delete('/:id', deleteMemberController)
membersRoute.put('/:id', updateMemberController)

export default membersRoute
