
//Defining Sequalize Methods for the Services to use.
  //The idea is to abstract the Methods in such a way that they can be implemented for any model.

import { sequelize } from "./db";
import { MemberEvent } from "./models/bridge_models/members_event";
import Member from "./models/members";
import Event from "./models/members"

export const findAll = async (model: any, query: object, join?: any, alias?: string) => {
  try {
    const options: any = {
      where:
        query,
    };
    
    if(join){
      options.include = [{model: join, as: alias, required: false}]
    }
    
    const results = await model.findAll(options);
 
    return results;
  } catch (error) {
    console.error("Error finding the models", error);
  }
};

export const find = async (model: any, id: string) => {
  try {
    const results = await model.findOne(
      {where: {

        id: id

      }
    });

    return results;
  } catch (error) {
    console.error("Error finding the model", error);
  }
};

export const create = async (model: any, data: object) => {
  try {
    const result = await model.create(data);

    return result;
  } catch (error) {
    console.error("Error creating the entity", error);
  }
};

export const remove = async (model: any, id: string) => {
  try {
     await model.destroy({
      where: {
        id
      }
    });
   
  } catch (error) {
    console.error("Error deleting the entity", error);
  }
};

export const update = async (model: any, id: string, data: any) => {
  try {
    const results = await model.update(data, {
      where: {
        id
      }
    });

    return results;
  } catch (error) {
    console.error("Error updating the entity", error);
  }
};


export const addMemberToEvent = async (eventId: string, memberId: string) => {
    try {
      const event = (await Event.findByPk(eventId)) as any;
      const member = (await Member.findByPk(memberId)) as any;

      // check if event and member exist
      if (!event || !member) {
        throw new Error('Event or member not found');
      }

      // add member to event  
      await MemberEvent.create({ memberId, eventId });

      return { message: 'Member added to event' };
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error');
    }
  };

sequelize.sync()