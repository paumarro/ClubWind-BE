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
      }
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



////////////////////////////////////////UPDATE


interface MemberData {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  address?: {
    post_code?: string;
    country?: string;
    street_name?: string;
    street_number?: number;
    floor?: string;
    apartment?: string;
  };
  image?: {
    url?: string;
  };
  role?: string;
}

class MemberService {
  async updateMember(id: string, data: MemberData) {
    const { address, image, role, ...memberData } = data;

    const transaction = await sequalize.transaction();

    try {
      const member: any = await Member.findOne({
        where: { id },
        include: [Address, Image, Role],
        transaction,
      });

      if (!member) {
        throw new Error('Member not found');
      }

      Object.assign(member, memberData);

      if (address) {
        Object.assign(member.Address, address);
      }

      if (image) {
        if (!member.Image) {
          member.Image = await Image.create({ url: image.url }, { transaction });
        } else {
          Object.assign(member.Image, image);
          await member.Image.save({ transaction });
        }
      }

      if (role) {
        const newRole: any = await Role.findOne({ where: { name: role }, transaction });
        if (!newRole) {
          throw new Error('Role not found');
        }
        member.RoleId = newRole.id;
      }

      await member.save({ transaction });
      await transaction.commit();

      return member;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

export default MemberService;
