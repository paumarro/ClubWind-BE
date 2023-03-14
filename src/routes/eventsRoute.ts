import { Router } from 'express'
import {
  createEventController,
  deleteEventController,
  getAllEventsController,
  getEventController,
  searchAllEventsController,
  updateEventController,
} from '../controllers/eventsController'

const eventsRoute: Router = Router()

eventsRoute.get('/search', searchAllEventsController)
eventsRoute.get('/', getAllEventsController)
eventsRoute.get('/:id', getEventController)
eventsRoute.post('/', createEventController)
eventsRoute.delete('/:id', deleteEventController)
eventsRoute.put('/:id', updateEventController)

export default eventsRoute