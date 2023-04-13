import { Router } from 'express'
import { loginController, registerController } from '../controllers/userController';
import { validateUserLogin, validateUserRegistration } from '../validations/validations';


export const userRoute: Router = Router()


userRoute.post('/login',validateUserLogin, loginController);
userRoute.post('/register', validateUserRegistration, registerController);