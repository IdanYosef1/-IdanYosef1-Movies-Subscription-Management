const express = require('express');
const router = express.Router();
const bll = require('../BLL/membersBLL');

router.get('/',async (req,res) => {
    try{
        const members = await bll.getAllMembers();
        res.send(members);
    }catch(err){
        res.send(err);
    }
});

router.get('/:id',async (req,res) => {
    try{
        const member = await bll.getMemberById(req.params.id);
        res.send(member);
    }catch(err){
        res.send(err);
    }
});

router.post('/',async (req,res) => {
    try{
        const data = await bll.createMember(req.body);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

router.put('/:id',async (req,res) => { 
    try{
        const data = await bll.updateMember(req.params.id, req.body);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

router.delete('/:id', async(req,res) => {
    try{
        const data = await bll.deleteMember(req.params.id, req.body);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

module.exports = router;