import Group from "../entities/Group.js";

async function getAllGroups() {
  try {
    const groups = await Group.findAll();
    return { success: true, groups: groups };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}

async function getGroupById(id) {
  try {
    const group = await Group.findByPk(id);
    return { success: true, group: group };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}

async function createGroup(group) {
  try {
    const groupCreated= await Group.create(group);
    return { success: true, group: groupCreated };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}

//select pe toate grupurile create de un anumit user
async function getGroupsByUserId(userId) {
  try {
    const groups = await Group.findAll({
      where: {
        UserId: userId,
      },
    });
    return { success: true, groups: groups };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}

export { getAllGroups, getGroupById, createGroup, getGroupsByUserId };
