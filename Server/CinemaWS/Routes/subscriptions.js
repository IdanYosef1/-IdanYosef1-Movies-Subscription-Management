const express = require('express');
const router = express.Router();
const url = 'http://localhost:8001/api/subscriptions';
const axios = require('axios');

router.get('/',async (req,res) => {
    try{
        const subscriptions = (await axios.get(url)).data;
        res.send(subscriptions);
    }catch(err){
        res.send(err);
    }
});

router.get('/:id',async (req,res) => {
    try{
        const subscription = (await axios.get(`${url}/${req.params.id}`)).data;
        res.send(subscription);
    }catch(err){
        res.send(err);
    }
});

router.post('/',async (req,res) => {
    try{
        const subscription = (await axios.post(url, req.body)).data;
        res.send(subscription);
    }catch(err){
        res.send(err);
    }
});

router.put('/:id',async (req,res) => { 
    try{
        const subscription = (await axios.put(`${url}/${req.params.id}`, req.body)).data;
        res.send(subscription);
    }catch(err){
        res.send(err);
    }
});

router.delete('/:id', async(req,res) => {
    try{
        const subscription = (await axios.delete(`${url}/${req.params.id}`)).data;
        res.send(subscription);
    }catch(err){
        res.send(err);
    }
});

module.exports = router;