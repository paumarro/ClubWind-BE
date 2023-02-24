import { Request, Response, Router } from 'express'

const financeRoute: Router = Router()

financeRoute.get('/', (req: Request, res: Response) => {
  res.send('Hello Finance!')
})

financeRoute.delete('/:id', (req: Request, res: Response) => {
  res.send('Delete Finance Entry')
})

export default financeRoute
