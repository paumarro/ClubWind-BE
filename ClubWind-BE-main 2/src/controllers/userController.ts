import { NextFunction, Request, Response } from 'express'
import { User } from '../database/models/users';


export const loginController = async (
   rq: Request,
   re: Response,
   nf: NextFunction
) => {
   const { email, password } = rq.body;
   const user:any = await User.findOne({where: {email}});


   if(!email || user.password !== password) {
       return re.status(401).send('Incorrect email or password');
   } else {
   rq.session.user = user;
   re.send('Logged in');
    }
};


export const registerController = async (
   rq: Request,
   re: Response,
   nf: NextFunction
) => {
   const { email, username, password } = rq.body;
   const user:any = await User.findOne({where: {email}});

   if(user.email == email) {
       return re.status(401).send('This email address is already registered');
   } 
   rq.session.user = user;
   User.create(rq.body)
};
