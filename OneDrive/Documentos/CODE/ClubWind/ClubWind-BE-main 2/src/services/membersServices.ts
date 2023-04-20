import Member from "../database/models/members";
import {
  findAll,
  find,
  create,
  remove,
  update,
  findAndJoin,
  findAndJoin3,
} from "../database/methods";
import { FullMemberBody, MemberBody } from "../types/interfaces";
import Event from "../database/models/events";
import Address from "../database/models/addresses";
import Image from "../database/models/images";
import { sequalize } from "../database/db";
import { Role } from "../database/models/roles";

export const getAllMemberService = async () => {
  const members = findAll(Member, {});

  return members;
};

export const searchAllMemberService = async (query: any) => {
  const members = findAll(Member, query);

  return members;
};

export const getMemberEventsService = async (_id: string) => {
  const member = findAndJoin(Member, _id, Event, "events");

  return member;
};

export const getMemberService = async (_id: string) => {
  const member = findAndJoin3(Member, _id, Address, Image, Role);

  return member;
};

export const createMemberService = async (fullMemberBody: FullMemberBody) => {
  const {
    first_name,
    last_name,
    date_of_entry,
    email,
    phone,
    gender,
    birthday,
    address,
    image,
    roleId,
    clubId,
  } = fullMemberBody;

  const result = await sequalize.transaction(async (transaction) => {
    let memberAddressId: number;

    // Check if address already exists
    const existingAddress: any = await Address.findOne({
      where: {
        country: address.country,
        post_code: address.post_code,
        street_name: address.street_name,
        street_number: address.street_number,
        floor: address.floor,
        apartment: address.apartment,
      },
    });

    if (existingAddress) {
      // Use existing address if found
      memberAddressId = existingAddress.id;
    } else {
      // Create new address if not found
      const newAddress: any = await Address.create(
        {
          country: address.country,
          post_code: address.post_code,
          street_name: address.street_name,
          street_number: address.street_number,
          floor: address.floor,
          apartment: address.apartment,
        },
        { transaction }
      );
      memberAddressId = newAddress.id;
    }

    // Create new image and role
    const memberImage: any = await Image.create(
      {
        name: image.name,
        description: image.description,
        type: image.type,
        url: image.url,
      },
      { transaction }
    );

    // Create new member with given or generated ids
    const newMember: any = await Member.create(
      {
        first_name,
        last_name,
        date_of_entry,
        email,
        phone,
        gender,
        birthday,
        imageId: memberImage.id,
        addressId: memberAddressId,
        roleId,
        clubId,
      },
      { transaction }
    );

    return newMember;
  });

  return result;
};

export const deleteMemberService = async (_id: string) => {
  remove(Member, _id);

  return _id;
};

export const updateMemberService = async (id: string, body: MemberBody) => {
  const member = update(Member, id, body);

  return member;
};
