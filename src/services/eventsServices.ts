import { findAll } from '../database/methods'
import { EventBody } from '../types/interfaces'

export const getAllEventsService = async () => {
  const results = await findAll(Event, {})

  return results
}

export const createEventService = async (body: EventBody) => {
  const newEvent: EventBody = {
    _id: body._id,
    name: body.name,
    date: body.date,
  }
}

export const deleteEventService = async (_id: string) => {}
