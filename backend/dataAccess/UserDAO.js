import User from "../entities/User.js";

//de adaugat try-catch

async function getAllUsers() {
  try {
    const users = await User.findAll();
    return { success: true, users: users };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}

async function getUserById(id) {
  try {
    const user = await User.findByPk(id);
    return { success: true, user: user };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}

async function createUser(user) {
  try {
    const user = await User.create(user);
    return { success: true, user: user };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}
async function getUserByEmail(email) {
  try {
    const users = await User.findAll({
      where: {
        UserEmail: email,
      },
    });
    return { success: true, users: users };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}

export { getAllUsers, getUserById, createUser, getUserByEmail };
