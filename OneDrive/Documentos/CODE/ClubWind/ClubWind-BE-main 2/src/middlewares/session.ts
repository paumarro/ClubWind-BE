import { Request, Response, NextFunction } from "express"


export const isAdmin =  (
    rq: Request,
    re: Response,
    nf: NextFunction 
    ) => {
        console.log(rq.session.user)
    if (rq.session.user?.isAdmin) {
  
      nf()
    
    }else{
  
      return re.status(401).json('Unauthorized')
    }
    
  }