import { findAll, find, remove, update, create } from '../database/methods'
import { ClubBody } from '../types/interfaces'
import { Club } from '../database/models/clubs'



export const searchAllClubsService = async (query: object) => {
  const clubs = findAll(Club, query)

  return clubs
}

export const getAllClubsService = async () => {
  const clubs = findAll(Club, {})

  return clubs
}

export const getClubService = async (_id: string) => {
  const club = find(Club, _id)

  return club

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
  const club = update(Club, _id, body)

  return club
}
