import express, { Express, NextFunction, json, Response, Request, urlencoded } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import { Session } from 'express-session'



import { establishDBConnection } from './src/database/db'
import eventsRoute from './src/routes/eventsRoute'
import membersRoute from './src/routes/membersRoute'
import clubsRoute from './src/routes/clubsRoute'
import { limiter } from './src/middlewares/rateLimiter'
import { sanitizeHeadersQuerysAndParams, sanitizeBodys } from './src/middlewares/sanitisation'
import { userRoute } from './src/routes/userRoute'

const session = require("express-session")

const app: Express = express()

establishDBConnection()

app.use(sanitizeHeadersQuerysAndParams);
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(morgan('dev'));
app.use(json());
app.use(sanitizeBodys);
app.use(
  urlencoded({
    extended: true,
  })
);

//Authentication & Authorisation

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
};

app.use(session({
  secret:'wsryextrucytivuyobiupnoi',
  resave:false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 } // secure true only works over HTTPS
}));

const isAuthenticated = async (
  rq: Request & { session: Session },
  re: Response,
  nf: NextFunction 
  ) => {
  if (rq.session && rq.session.user) {
    nf()
  
  }else{
    //Redirect to login or different default page
  }
  
};

const isAdmin = async (
  rq: Request & { session: Session},
  re: Response,
  nf: NextFunction 
  ) => {
  if (rq.session.user && rq.session.user.isAdmin) {
    nf()
  
  }else{

    //Redirect to login or different default page
  }
  
}


app.post('/login', (
rq: Request & { session: Session },
re: Response) => {
  // Check the user's credentials and set the user session variable if valid
  // ...
  rq.session.user = { username: 'john', isAdmin: true };
  re.redirect('/dashboard');
});

app.get('/logout', (req, res) => {
  // Clear the user session variable and redirect to the login page
  res.redirect('/login');
});


app.use('/events', eventsRoute)
app.use('/members', membersRoute)
app.use('/clubs', clubsRoute)


app.use('/user', userRoute)
export default app