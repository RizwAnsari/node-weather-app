import User from "../../Model/User.js";

async function createUser(user){
    return await User.createUser(user);
}

async function fetchUser(cred) {
    const user = await User.authenticateUser(cred);
    return user;
}

export default {
    createUser,
    fetchUser
}