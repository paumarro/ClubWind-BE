import { findAll, find, remove, update, create } from '../database/methods'
import { ClubBody, Name } from '../types/interfaces'
import { Club } from '../database/models/clubs'



export const searchAllClubsService = async (query: object) => {
  const results = findAll(Club, query)
}

export const getAllClubsService = async () => {
  const results = findAll(Club, {})

  return results
}

export const getClubService = async (_id: string) => {
  const result = find(Club, _id)

  return result

}

export const createClubService = async (body: ClubBody) => {
  const newClub = create(Club, body)
  
  return newClub
}

export const deleteClubService = async (_id: string) => {
  remove(Club, _id)

  return _id
}

export const updateClubService = async ( _id: string, body: ClubBody) => {
  const result = update(Club, _id, body)

  return result
}
