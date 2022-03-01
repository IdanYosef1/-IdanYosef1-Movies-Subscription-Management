const express = require('express');
const router = express.Router();
const bll = require('../BLL/permissionsBLL')


router.get('/',async (req,res) => {
    try{
        const permissions = await bll.getAllPermissions();
        res.send(permissions);
    }catch(err){
        res.send(err);
    }
});

router.get('/:id',async (req,res) => {
    try{
        const permission = await bll.getPermissionById(req.params.id);
        res.send(permission);
    }catch(err){
        res.send(err);
    }
});

router.post('/',async (req,res) => {
    try{
        const data = await bll.createPermission(req.body);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

router.put('/:id',async (req,res) => { 
    try{
        const data = await bll.updatePermission(req.params.id, req.body);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

router.delete('/:id', async(req,res) => {
    try{
        const data = await bll.deletePermission(req.params.id);
        res.send(data);
    }catch(err){
        res.send(err);
    }
})

module.exports = router;