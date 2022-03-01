const express = require('express');
const router = express.Router();
const bll = require('../BLL/subscriptionsBLL');

router.get('/',async (req,res) => {
    try{
        const subscriptions = await bll.getAllSubscriptions();
        res.send(subscriptions);
    }catch(err){
        res.send(err);
    }
});

router.get('/:id',async (req,res) => {
    try{
        const subscription = await bll.getSubscriptionById(req.params.id);
        res.send(subscription);
    }catch(err){
        res.send(err);
    }
});

router.post('/',async (req,res) => {
    try{
        const data = await bll.createSubscription(req.body);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

router.put('/:id',async (req,res) => { 
    try{
        const data = await bll.updateSubscription(req.params.id, req.body);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

router.delete('/:id', async(req,res) => {
    try{
        const data = await bll.deleteSubscription(req.params.id, req.body);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

module.exports = router;