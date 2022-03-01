const model = require('../Model/usersModel');

const getAllUsers = () => {
    return new Promise((resolve,reject) => {
        model.find({},(err,users) => {
            if(err){
                reject(err);
            }
            else{
                resolve(users);
            }
        })
    })
}

const getUserById = (id) => {
    return new Promise((resolve,reject) => {
        model.findById(id,(err,user) => {
            if(err){
                reject(err);
            }
            else{
                resolve(user);
            }
        })
    })
} 

const createUser = (userObj) => {
    return new Promise((resolve,reject) => {
        const newUser = new model(userObj);
        newUser.save((err) => {
            if(err){
                reject(err);
            }
            else{
                resolve(newUser);
            }
        })
    })
} 

const updateUser = (id, userObj) => {
    return new Promise((resolve,reject) => {
        model.findByIdAndUpdate(id,userObj,(err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Updated successfully");
            }
        })
    })
} 

const deleteUser = (id) => {
    return new Promise((resolve,reject) => {
        model.findByIdAndDelete(id,(err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Deleted successfully");
            }
        })
    })
} 

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}