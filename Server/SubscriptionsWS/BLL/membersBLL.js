const model = require('../Model/membersModel');
const axios = require('axios');

const getAllMembers = () => {
    return new Promise((resolve,reject) => {
        model.find({},(err,members) => {
            if(err){
                reject(err);
            }
            else{
                resolve(members);
            }
        })
    })
} 

const getMemberById = (id) => {
    return new Promise((resolve,reject) => {
        model.findById(id,(err,member) => {
            if(err){
                reject(err);
            }
            else{
                resolve(member);
            }
        })
    })
} 

const createMember = async (memberObj) => {
    return new Promise((resolve,reject) => {
        const newMember = new model(memberObj);
        newMember.save((err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Added successfully");
            }
        })
    })  
} 

const updateMember = (id, memberObj) => {
    return new Promise((resolve,reject) => {
        model.findByIdAndUpdate(id,memberObj,(err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Updated successfully");
            }
        })
    })
} 

const deleteMember = (id) => {
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

const insertMembers = async (url) => {
    try{
        const allMembers = await getAllMembers();
        if(allMembers.length === 0){
                const members = (await axios.get(url)).data
                members.forEach(async (member) => {
                const obj = {
                    name:member.name,
                    email:member.email,
                    city:member.address.city
                }
                await createMember(obj)
            });
        }
    }catch(err){
        console.log(err);
    }
}


module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
    insertMembers
}