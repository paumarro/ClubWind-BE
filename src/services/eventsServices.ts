import Event from '../database/models/events'
import { findAll, find, create, remove, update  } from '../database/methods'
import { EventBody } from '../types/interfaces'
import Member from '../database/models/members'

export const searchAllEventsService = async (query: any) => {
  const events = findAll(Event, query, Member, "members")

  return events
}

export const getAllEventsService = async () => {
  const events = await findAll(Event, {}, Member, "members")

  return events
}

export const getEventService = async ( _id: string) => {
  const event = find(Event, _id)

  return event
}

export const createEventService = async (body: EventBody) => {
  const newEvent = create(Event, body)

  return newEvent
}

export const deleteEventService = async (_id: string) => {
  remove(Event, _id)

  return _id
}

export const updateEventService = async ( id: string, body: EventBody) => {
  const event = update(Event, id, body)

  return event
}
 