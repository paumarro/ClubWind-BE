import { Router } from 'express'
import {
  createEventController,
  deleteEventController,
  getAllEventsController,
} from '../controllers/eventsController'

const eventsRoute: Router = Router()

eventsRoute.get('/', getAllEventsController)

eventsRoute.post('/', createEventController)

eventsRoute.delete('/:id', deleteEventController)

export default eventsRoute