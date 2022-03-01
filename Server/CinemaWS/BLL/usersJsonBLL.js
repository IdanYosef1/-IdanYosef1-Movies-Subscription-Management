const usersDAL = require('../DAL/usersJsonDAL')

const getAllUsersJson = async () => {
    const usersJson = await usersDAL.getusersJSON();
    return [...usersJson];
} 

const getUserJsonById = async (id) => {
    const usersJson = await usersDAL.getusersJSON();
    const userJson = usersJson.find((user) => user.id === id);
    return {...userJson};
} 

const createUserJson = async (userObj) => {
    const usersJson = await usersDAL.getusersJSON();
    usersJson.push({...userObj});
    const res = await usersDAL.setusersJSON([...usersJson]);
    return res;
} 

const updateUserJson = async (id, userObj) => {
    const usersJson = await usersDAL.getusersJSON();
    const index = usersJson.findIndex((user) => user.id === id);
    if(index !== -1){
        usersJson[index] = {...userObj};
        const res =  await usersDAL.setusersJSON([...usersJson]);
        return res;
    }
    else{
        return 'Not found';
    }
} 

const deleteUserJson = async (id) => {
    const usersJson = await usersDAL.getusersJSON();
    const index = usersJson.findIndex((user) => user.id === id);
    if(index !== -1){
        usersJson.splice(index,1);
        const res = await usersDAL.setusersJSON([...usersJson]);
        return res;
    }
    else{
        return 'Not found';
    }
   
} 

module.exports = {
    getAllUsersJson,
    getUserJsonById,
    createUserJson,
    updateUserJson,
    deleteUserJson
}
