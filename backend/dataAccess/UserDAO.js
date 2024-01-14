import User from "../entities/User.js";

async function getAllUsers(){
    return await User.findAll();
}

async function getUserById(id){
    return await User.findByPk(id);
}

async function createUser(user){
    return await User.create(user);
}
async function getUserByEmail(email){
    return await User.findAll({
        where: {
            UserEmail:email,
        },
      });
}

export {
    getAllUsers,
    getUserById,
    createUser,
    getUserByEmail
}