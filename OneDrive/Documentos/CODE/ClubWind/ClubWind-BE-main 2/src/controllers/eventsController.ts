import { NextFunction, Request, Response } from 'express'
import {
  searchAllEventsService,
  createEventService,
  deleteEventService,
  getAllEventsService,
  getEventService,
  updateEventService,
  addMemberToEventService
} from '../services/eventsServices'

export const searchAllEventsController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
  
    const query = rq.query

    const events = await searchAllEventsService(query)

    return re.status(200).json(events)
  } catch (error) {
    re.status(500)
  }
}

export const getAllEventsController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
    const events = await getAllEventsService()

    return re.status(200).json(events)
  } catch (error) {
    re.status(500)
  }
}

export const getEventController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
    const event = await getEventService(rq.params.id)

    return re.status(201).json(event)
  } catch (error) {
    re.status(500)
  }
}


export const createEventController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
    const _id = await createEventService(rq.body)

    return re.status(201).json({ msg: 'Event was created', _id })
  } catch (error) {
    re.status(500)
  }
}

export const deleteEventController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
    const _id = deleteEventService(rq.params.id)

    return re.status(201).json({ msg: 'Event was deleted', _id })
  } catch (error) {
    re.status(500)
  }
}

export const updateEventController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
    const _id = await updateEventService(rq.params.id, rq.body)

    return re.status(201).json({ msg: 'Event was updated', _id })
  } catch (error) {
    re.status(500)
  }
}


export const addMemberToEventController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
    const { eventId, memberId } = rq.params;
    console.log('controller check')

    // validate input
    if (!eventId || !memberId) {
      return re.status(400).send({ message: 'Invalid input' });
    }


    const result = await addMemberToEventService( eventId, memberId )

    return re.status(201).json({ msg: 'Member was updated', result })
  } catch (error) {
    re.status(500)
  }
}