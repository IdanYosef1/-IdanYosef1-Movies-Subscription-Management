const express = require('express');
const router = express.Router();
const bll = require('../BLL/usersBLL');
const jsonbll = require('../BLL/usersJsonBLL')
const perbll = require('../BLL/permissionsBLL')

router.get('/',async (req,res) => {
    try{
        const users = await bll.getAllUsers();
        res.send(users);
    }catch(err){
        res.send(err);
    }
});

router.get('/:id',async (req,res) => {
    try{
        const user = await bll.getUserById(req.params.id);
        res.send(user);
    }catch(err){
        res.send(err);
    }
});

router.post('/',async (req,res) => {
    try{
        const user = await bll.createUser(req.body);
        res.send(user);
    }catch(err){
        res.send(err);
    }
});

router.put('/:id',async (req,res) => { 
    try{
        const data = await bll.updateUser(req.params.id, req.body);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

router.delete('/:id', async(req,res) => {
    try{
        const data = await bll.deleteUser(req.params.id);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

module.exports = router;