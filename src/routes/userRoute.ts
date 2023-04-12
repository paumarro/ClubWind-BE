import { Router } from 'express'
import { loginController } from '../controllers/userController'; 

export const userRoute: Router = Router()

userRoute.post('/login', loginController);
userRoute.post('/register', registerController);