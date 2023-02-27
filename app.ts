import express, { Express, json, urlencoded } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'

import { establishDBConnection } from './src/database/db'
import eventsRoute from './src/routes/eventsRoute'
import membersRoute from './src/routes/membersRoute'
import clubsRoute from './src/routes/clubsRoute'
import { limiter } from './src/middlewares/rateLimiter'
import { sanitizeHeadersQuerysAndParams, sanitizeBodys } from './src/middlewares/sanitisation'


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

app.use('/events', eventsRoute)
app.use('/members', membersRoute)
app.use('/clubs', clubsRoute)

export default app