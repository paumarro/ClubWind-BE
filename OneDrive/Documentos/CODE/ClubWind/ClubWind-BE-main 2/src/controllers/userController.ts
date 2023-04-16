import { Request, Response } from "express";
import { User } from "../database/models/users";
import Member from "../database/models/members";
import bcrypt from "bcrypt";

//refactor to services
export const loginController = async (
  rq: Request,
  re: Response,
) => {
  try {
    const { username, password } = rq.body;

    if (!password) {
      return re.status(400).json({ msg: "Please write a password" });
    }

    const user: any = await User.findOne({ where: { username: username } });

    if (!user) {
      return re.status(401).json({msg: "Invalid credentials"});
    }

    const match = bcrypt.compareSync(password, user.password);

    if (!match) {
      return re.status(401).json({msg: "Invalid credentials"});
    }

    rq.session.user = user;
    re.status(200).json({msg: "Login successful!"});
    
  } catch (err) {
    console.error(err);
    re.status(500).json({msg: "Server error"});
  }
};


export const registerController = async (
  rq: Request,
  re: Response,

) => {
  try {
    const { username, password, isAdmin } = rq.body;

    if (!password) {
      return re.status(400).json({ msg: "Please choose a password" });
    }

    const member: any = await Member.findOne({ where: { email: username } });
    let user: any = await User.findOne({ where: { username: username } });

    if (isAdmin && member.role !== "manager") {
      return re.status(400).json({ msg: "Cannot set isAdmin to true" });
    }

    if (!user && member && password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      rq.body.password = hashedPassword;
      user = await User.create(rq.body);
      rq.session.user = user;
      return re.status(200).json({ msg: "User created" });
    }
    if (user && member) {
      return re
        .status(401)
        .json({ msg: "This email address is already registered" });
    }
  } catch (error) {
    return re.status(500).json({ msg: "Registration not possible" });
  }
};
