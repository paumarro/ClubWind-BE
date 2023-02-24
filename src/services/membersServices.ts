import Member from '../database/members'
import { findAll, find, create, remove, update } from '../database/methods'
import { MemberBody } from '../types/interfaces'

export const searchAllMemberService = async (query: any) => {
  const members = findAll(Member, query)

  return members
}

export const getAllMemberService = async () => {
  const members = findAll(Member, {})

  return members
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
  const result = update(Member, id, body)

  return result
}
