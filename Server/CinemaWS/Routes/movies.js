const express = require('express');
const router = express.Router();
const url = 'http://localhost:8001/api/movies';
const axios = require('axios');

router.get('/',async (req,res) => {
    const movies = (await axios.get(url)).data;
    res.send(movies);
});

router.get('/:id',async (req,res) => {
    const movie = (await axios.get(`${url}/${req.params.id}`)).data;
    res.send(movie);
});

router.post('/',async (req,res) => {
    const movie = (await axios.post(url, req.body)).data;
    res.send(movie);
});

router.put('/:id',async (req,res) => { 
    const movie = (await axios.put(`${url}/${req.params.id}`, req.body)).data;
    res.send(movie);

});

router.delete('/:id', async(req,res) => {
    const movie = (await axios.delete(`${url}/${req.params.id}`)).data;
    res.send(movie);
});

module.exports = router;