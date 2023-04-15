import { NextFunction, Request, Response } from "express";
import { User } from "../database/models/users";
import Member from "../database/models/members";
import bcrypt from "bcrypt";

//catch does not function
export const loginController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
    const { username, password } = rq.body;
    if (username && password) {

      const user: any = await User.findOne({ where: { username } });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const match = await bcrypt.compare(password, hashedPassword);
      if (!match) {

        return re.status(401).send("Invalid credentials");
      }
      rq.session.user = user;
      re.send("Login successful!");
    }

  } catch (err) {
    console.error(err);
    re.status(500).send("Server error");
  }
};

export const registerController = async (
  rq: Request,
  re: Response,
  nf: NextFunction
) => {
  try {
    const { username, password } = rq.body;
    if (!password) {
      return re.status(401).json("Please choose a password");
    }
    const member: any = await Member.findOne({ where: { email: username } });
    let user: any = await User.findOne({ where: { username: username } });
    if (!user && member && password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      rq.body.password = hashedPassword;
      user = await User.create(rq.body);
      rq.session.user = user;
      return re.status(200).json({ msg: "User created" });
    }
  } catch (error) {
    //add "registration not possible" for not registered members
    return re.status(401).send("This email address is already registered");
  }
};
