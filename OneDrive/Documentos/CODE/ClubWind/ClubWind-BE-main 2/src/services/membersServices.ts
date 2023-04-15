import Member from '../database/models/members'
import { findAll, find, create, remove, update, findAndJoin } from '../database/methods'
import { MemberBody } from '../types/interfaces'
import Event from '../database/models/events'



export const getAllMemberService = async () => {
  const members = findAll(Member, {}, Event, "events")

  return members
}

export const searchAllMemberService = async (query: any) => {
  const members = findAll(Member, query, Event, "events")

  return members
}

export const getMemberEventsService = async (_id: string) => {
  const member = findAndJoin(Member, _id, Event, "events")

  return member
}

export const getMemberService = async ( _id: string) => {
  const member = find(Member, _id)

  return member
}

export const createMemberService = async (body: MemberBody) => {
  const newMember = create(Member, body)

  return newMember
}


export const deleteMemberService = async (_id: string) => {
  remove(Member, _id)

  return _id
}

export const updateMemberService = async ( id: string, body: MemberBody) => {
  const member = update(Member, id, body)

  return member
}
 