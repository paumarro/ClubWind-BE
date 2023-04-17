import { findAll, find, create, remove, update } from '../database/methods'
import Member from '../database/models/members';
import { User } from '../database/models/users'
import { UserBody } from '../types/interfaces'
import bcrypt from "bcrypt";

interface LoginResponse {
  error: boolean;
  status?: number;
  msg: string;
  user?: any;
}

export const loginService = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const user: any = await User.findOne({ where: { username: username } });

    if (!user) {
      return { error: true, status: 401, msg: "Invalid credentials" };
    }

    const match = bcrypt.compareSync(password, user.password);

    if (!match) {
      return { error: true, status: 401, msg: "Invalid credentials" };
    }

    return { error: false, user: user, msg: "Success" };
  } catch (err) {
    console.error(err);
    return { error: true, status: 500, msg: "Server error" };
  }
};


interface RegisterUserProps {
  username: string;
  password: string;
  isAdmin: boolean;
}

export const registerService = async ({ username, password, isAdmin }: RegisterUserProps) => {
  try {
    if (!password) {
      throw new Error('Please choose a password');
    }

    const member: any = await Member.findOne({ where: { email: username } });
    let user: any = await User.findOne({ where: { username: username } });

    if (isAdmin && member.role !== "manager") {
      throw new Error('Cannot set isAdmin to true');
    }

    if (!user && member && password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({ username, password: hashedPassword, isAdmin });
      return newUser;
    }
    if (user && member) {
      throw new Error('This email address is already registered');
    }
  } catch (error) {
    throw new Error('Registration not possible');
  }
}



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
  
  
  export const deleteUserService = async (_id: string) => {
    remove(User, _id)
  
    return _id
  }
  
  export const updateUserService = async ( id: string, body: UserBody) => {
    const user = update(User, id, body)
  
    return user
  }
   