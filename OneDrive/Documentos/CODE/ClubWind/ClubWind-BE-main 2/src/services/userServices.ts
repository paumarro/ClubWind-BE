import { findAll, find, create, remove, update } from '../database/methods'
import { User } from '../database/models/users'
import { UserBody } from '../types/interfaces'

export const searchAllUserService = async (query: any) => {
    const users = findAll(User, query, Event, "events")
  
    return users
  }
  
  export const getAllUserService = async () => {
    const users = findAll(User, {}, Event, "events")
  
    return users
  }
  
  export const getUserService = async ( _id: string) => {
    const user = find(User, _id)
  
    return user
  }
  
  export const createUserService = async (body: UserBody) => {
    const newUser = create(User, body)
  
    return newUser
  }
  
  
  export const deleteUserService = async (_id: string) => {
    remove(User, _id)
  
    return _id
  }
  
  export const updateUserService = async ( id: string, body: UserBody) => {
    const user = update(User, id, body)
  
    return user
  }
   