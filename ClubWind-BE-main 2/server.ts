import { NextFunction, Request, Response } from 'express'
import { Server } from 'http'
import app from './app'

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json('Not Found.')
})

app.use(
  async (
    err: { message: Promise<string>; status: number | PromiseLike<number> },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.locals.message = await err.message

    res.status((await err.status) || 500).json('Something went wrong.')
  }
)

let port: string | number = '3000'

const server: Server = app.listen(port, async () => {
  console.log(`\n  ------ Server started :${port} ------`)
})

export default server
