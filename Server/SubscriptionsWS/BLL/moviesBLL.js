const model = require('../Model/moviesModel');
const axios = require('axios');

const getAllMovies = () => {
    return new Promise((resolve,reject) => {
        model.find({},(err,movies) => {
            if(err){
                reject(err);
            }
            else{
                resolve(movies);
            }
        })
    })
} 

const getMoiveById = (id) => {
    return new Promise((resolve,reject) => {
        model.findById(id,(err,movie) => {
            if(err){
                reject(err);
            }
            else{
                resolve(movie);
            }
        })
    })
} 

const createMovie = (movieObj) => {
    return new Promise((resolve,reject) => {
        const newMovie = new model(movieObj);
        newMovie.save((err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Added successfully");
            }
        })
    })
} 

const updateMovie = (id, movieObj) => {
    return new Promise((resolve,reject) => {
        model.findByIdAndUpdate(id,movieObj,(err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Updated successfully");
            }
        })
    })
} 

const deleteMovie = (id) => {
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

const insertMovies = async (url) => {
    try{
        const allMovies = await getAllMovies();
        if(allMovies.length === 0){
            const movies = (await axios.get(url)).data;
            const tenMovies = movies.splice(0,10);
            tenMovies.forEach(async (movie) => {
                const obj = {
                    name:movie.name,
                    genres:movie.genres,
                    image:movie.image.medium,
                    premiered:movie.premiered
                }
                await createMovie(obj);
            });
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getAllMovies,
    getMoiveById,
    createMovie,
    updateMovie,
    deleteMovie,
    insertMovies
}