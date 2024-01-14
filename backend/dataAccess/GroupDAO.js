import Group from "../entities/Group.js";

async function getAllGroups(){
    return await Group.findAll();
}

async function getGroupById(id){
    return await Group.findByPk(id);
}

async function createGroup(group){
    return await Group.create(group);
}

//select pe toate grupurile create de un anumit user
async function getGroupsByUserId(userId){
    return await Group.findAll({
        where: {
            UserId:userId,
        },
      });
}

export {
    getAllGroups,
    getGroupById,
    createGroup,
    getGroupsByUserId
}