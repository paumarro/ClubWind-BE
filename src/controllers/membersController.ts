import { NextFunction, Request, Response } from 'express'
import {
  createMemberService,
  deleteMemberService,
  getAllMemberService,
  getMemberService,
  searchAllMemberService as searchAllMembersService,
  updateMemberService,
} from '../services/membersServices'

export const searchAllMembersController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
  
    const query = rq.query

    const results = await searchAllMembersService(query)

    return re.status(200).json(results)
  } catch (error) {
    re.status(500)
  }
}


export const getAllMembersController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
    const results = await getAllMemberService()

    return re.status(200).json(results)
  } catch (error) {
    re.status(500)
  }
}


export const getMemberController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
    const result = await getMemberService(rq.params.id)

    return re.status(201).json(result)
  } catch (error) {
    re.status(500)
  }
}

export const createMemberController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
    const _id = await createMemberService(rq.body)

    return re.status(201).json({ msg: 'Member was created', _id })
  } catch (error) {
    re.status(500)
  }
}

export const deleteMemberController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
    const _id = await deleteMemberService(rq.params.id)

    return re.status(201).json({ msg: 'Member was deleted', _id })
  } catch (error) {
    re.status(500)
  }
}

export const updateMemberController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
    const _id = await updateMemberService(rq.params.id, rq.body)

    return re.status(201).json({ msg: 'Member was updated', _id })
  } catch (error) {
    re.status(500)
  }
}

