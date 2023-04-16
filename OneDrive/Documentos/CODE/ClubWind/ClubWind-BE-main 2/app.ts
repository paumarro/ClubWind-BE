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
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


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


//Authentication & Authorisation////////////////////////////////////////////////////////

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
};

app.use(session({
  secret:'wsryextrucytivuyobiupnoi',
  resave:false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // secure true only works over HTTPS
}));

//Oauth////////////////
app.use(passport.initialize());

// Configure the Google OAuth2 strategy
passport.use(new GoogleStrategy({
    clientID: '158455817017-66oudddoqg8r4cijlrus7krrcnmcvecn.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
    // Find or create the user in your database using Sequelize
    // and call done() with the user object.
}));

//////////////////////////////////////////////////////////////////////////////////////


app.use('/events', eventsRoute)
app.use('/members', membersRoute)
app.use('/clubs', clubsRoute)

app.use('/users', userRoute)

export default app 