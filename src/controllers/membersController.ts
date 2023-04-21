import { NextFunction, Request, Response } from 'express'
import MemberService, {
  createMemberService,
  deleteMemberService,
  getAllMemberService,
  getMemberEventsService,
  getMemberService,
  searchAllMemberService as searchAllMembersService,
} from '../services/membersServices'





export const getAllMembersController = async (
  rq: Request,
  re: Response,
) => {
  try {
    
    if(rq.query){
    const query = rq.query

    const results = await searchAllMembersService(query)

    return re.status(200).json(results)
  } else {
    const results = await getAllMemberService()

    return re.status(200).json(results)
  }
  } catch (error) {
    re.status(500)
  }
};


export const getMemberController = async (
  rq: Request,
  re: Response,
) => {
  try {
    const result = await getMemberService(rq.params.id)

    return re.status(201).json(result)
  } catch (error) {
    re.status(500)
  }
};

export const getMemberEventsController = async (
  rq: Request,
  re: Response,
) => {
  try {
    const result = await getMemberEventsService(rq.params.id)

    return re.status(201).json(result)
  } catch (error) {
    re.status(500)
  }
};

export const createMemberController = async (
  rq: Request,
  re: Response,
) => {
  
  try {
    const _id = await createMemberService(rq.body)

    return re.status(201).json({ msg: 'Member was created', _id })
  } catch (error) {
    console.error(error)
    return re.status(500).json({ msg: 'Internal Server Error' })
  }
};

export const deleteMemberController = async (
  rq: Request,
  re: Response,
) => {
  try {
    const _id = await deleteMemberService(rq.params.id)

    return re.status(201).json({ msg: 'Member was deleted', _id })
  } catch (error) {
    re.status(500)
  }
}


const memberService = new MemberService();
 
class MemberController {
  update(arg0: string, update: any) {
    throw new Error("Method not implemented.");
  }
  async updateMember(req: Request, res: Response) {
    const id = req.params.id;
    const { first_name, last_name, email, phone, birthday, address, image, role } = req.body;

    try {
      const updatedMember = await memberService.updateMember(id, {
        first_name,
        last_name,
        email,
        phone,
        birthday,
        address,
        image,
        role,
      });
      return res.status(200).json(updatedMember);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
}

export default MemberController;




