const express = require('express');
const router = express.Router();
const bll = require('../BLL/usersJsonBLL');

router.get('/',async (req,res) => {
    try{
        const usersJson = await bll.getAllUsersJson();
        res.send(usersJson);
    }catch(err){
        res.send(err);
    }
});

router.get('/:id',async (req,res) => {
    try{
        const userJson = await bll.getUserJsonById(req.params.id);
        res.send(userJson);
    }catch(err){
        res.send(err);
    }
});

router.post('/',async (req,res) => {
    try{
        const data = await bll.createUserJson(req.body);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

router.put('/:id',async (req,res) => { 
    try{
        const data = await bll.updateUserJson(req.params.id, req.body);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

router.delete('/:id', async(req,res) => {
    try{
        const data = await bll.deleteUserJson(req.params.id);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

module.exports = router;