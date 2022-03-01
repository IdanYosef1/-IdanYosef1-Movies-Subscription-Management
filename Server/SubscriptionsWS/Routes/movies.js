const express = require('express');
const router = express.Router();
const bll = require('../BLL/moviesBLL');

router.get('/',async (req,res) => {
    try{
        const movies = await bll.getAllMovies();
        res.send(movies);
    }catch(err){
        res.send(err);
    }
});

router.get('/:id',async (req,res) => {
    try{
        const movie = await bll.getMoiveById(req.params.id);
        res.send(movie);
    }catch(err){
        res.send(err);
    }
});

router.post('/',async (req,res) => {
    try{
        const data = await bll.createMovie(req.body);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

router.put('/:id',async (req,res) => { 
    try{
        const data = await bll.updateMovie(req.params.id, req.body);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

router.delete('/:id', async(req,res) => {
    try{
        const data = await bll.deleteMovie(req.params.id, req.body);
        res.send(data);
    }catch(err){
        res.send(err);
    }
});

module.exports = router;