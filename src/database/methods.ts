//Defining Sequalize Methods for the Services to use.
  //The idea is to abstract the Methods in such a way that they can be implemented for any model.

import { sequelize } from "./db";

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

sequelize.sync()