import Member from '../database/models/members';
import { User } from '../database/models/users'
import bcrypt from "bcrypt";
import { RegisterUserProps } from '../types/interfaces';

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

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log(user.password)
      console.log(password)
      return { error: true, status: 401, msg: "Invalid credentialsS" };
    };
    
    return { error: false, user: user, msg: "Success" };
  } catch (err) {
    console.error(err);
    return { error: true, status: 500, msg: "Server error" };
  }
};


//Fix error handeling in try block
//make the username linked to the Member.email, without it needing to be the same value to remove redundncy
export const registerService = async ({ username, password, isAdmin }: RegisterUserProps) => {
  try {
    if (!password) {
      throw new Error('Password is required.');
    }

    const member: any = await Member.findOne({ where: { email: username } });
    if (!member) {
      throw new Error('A member with this email does not exist.');
    }

    let user: any = await User.findOne({ where: { memberId: member.id } });
    if (user) {
      throw new Error('A user for this member already exists.');
    }

    if (isAdmin && member.roleId !== 3) {
      throw new Error('Only members with a specific role can be admins.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username, // This is still required for login purposes
      password: hashedPassword,
      isAdmin,
      memberId: member.id
    });

    return { error: false, msg: "Registration successful", newUser };

  } catch (error) {
    // Correctly type-check the error before accessing its properties
    if (error instanceof Error) {
      console.error(error.message);
      return { error: true, msg: error.message };
    } else {
      // Handle cases where the error might not be an instance of Error
      console.error("An unexpected error occurred");
      return { error: true, msg: "An unexpected error occurred" };
    }
  }
};

