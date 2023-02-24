import express, { Express, json, urlencoded } from 'express'
import { establishDBConnection } from './src/database/db'
import eventsRoute from './src/routes/eventsRoute'
import membersRoute from './src/routes/membersRoute'
import clubsRoute from './src/routes/clubsRoute'

import morgan from 'morgan'
import helmet from 'helmet'

const app: Express = express()

establishDBConnection()

app.use(helmet());
app.use(morgan('dev'));
app.use(json())
app.use(
  urlencoded({
    extended: true,
  })
)


// https://expressjs.com/en/guide/using-middleware.html
app.use('/events', eventsRoute)
app.use('/members', membersRoute)
app.use('/clubs', clubsRoute)

export default app