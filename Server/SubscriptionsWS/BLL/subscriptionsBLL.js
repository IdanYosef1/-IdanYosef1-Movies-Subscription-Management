const model = require('../Model/subscriptionsModel');

const getAllSubscriptions = () => {
    return new Promise((resolve,reject) => {
        model.find({},(err,subscriptions) => {
            if(err){
                reject(err);
            }
            else{
                resolve(subscriptions);
            }
        })
    })
} 

const getSubscriptionById = (id) => {
    return new Promise((resolve,reject) => {
        model.findById(id,(err,subscription) => {
            if(err){
                reject(err);
            }
            else{
                resolve(subscription);
            }
        })
    })
} 

const createSubscription = (subscriptionObj) => {
    return new Promise((resolve,reject) => {
        const newsubscription = new model(subscriptionObj);
        newsubscription.save((err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Added successfully");
            }
        })
    })
} 

const updateSubscription = (id, subscriptionObj) => {
    return new Promise((resolve,reject) => {
        model.findByIdAndUpdate(id, subscriptionObj, (err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Updated successfully");
            }
        })
    })
} 

const deleteSubscription = (id) => {
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
    getAllSubscriptions,
    getSubscriptionById,
    createSubscription,
    updateSubscription,
    deleteSubscription
}