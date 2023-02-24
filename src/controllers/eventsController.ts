import { NextFunction, Request, Response } from 'express'
import {
  createEventService,
  deleteEventService,
  getAllEventsService,
} from '../services/eventsServices'

export const getAllEventsController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
    const results = await getAllEventsService()

    return re.status(200).json(results)
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