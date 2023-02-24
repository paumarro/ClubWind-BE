import { Router } from 'express'
import {
  createClubController,
  deleteClubController,
  getAllClubsController,
  getClubController,
  searchAllClubsController,
  updateClubController,
} from '../controllers/clubsController'

const clubsRoute: Router = Router()

clubsRoute.get('/search', searchAllClubsController)
clubsRoute.get('/', getAllClubsController)
clubsRoute.get('/:id', getClubController)
clubsRoute.post('/', createClubController)
clubsRoute.delete('/:id', deleteClubController)
clubsRoute.put('/:id', updateClubController)

export default clubsRoute