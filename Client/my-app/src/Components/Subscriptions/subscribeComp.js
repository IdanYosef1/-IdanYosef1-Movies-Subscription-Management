import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context';
import { createData, getAll, updateData } from '../../utils';

const urlMovies = 'http://localhost:8000/api/movies';
const urlSubs = 'http://localhost:8000/api/subscriptions';

function SubscribeComp() {
    const [remainingMovies, setMovies] = useState([]);
    const [selectName, setSelectName] = useState('');
    const [dataObj, setDataObj] = useState({movieId:'', date: ''});
    const {value1, value2, value3} = useContext(Context);
    const [moviesSubs] = value1;
    const [idMember] = value2;
    const [updatePage] = value3;

    // Bringing the movies that the member subscribe for them to the state.
    useEffect(() => {
        async function getData(){
            try{
                const data = (await getAll(urlMovies)).data;
                const arr = [];
                const moviesName = moviesSubs.map(movie => movie.name);
                data.forEach(element => {
                    if(moviesName.indexOf(element.name) === -1){
                        arr.push({name:element.name, id:element._id});
                    }
                });
                setSelectName('');
                setMovies(arr);
            }catch(err){
                console.log(err);
            }
        }
        getData();
    },[moviesSubs]);

    // Update the dataObj according to the input.
    const setData = (e) => {
        const {name, value} = e.target;
        const newObj = {...dataObj};
        newObj[name] = value ;
        setDataObj(newObj);
    }

    // Update the selectName and the dataObj according to the input.
    const setSelect = (e) => {
        const index = e.target.selectedIndex;
        const element = e.target.childNodes[index];
        const id = element.getAttribute('id'); 
        const {name, value} = e.target;
        const newObj = {...dataObj};
        newObj[name] = id;
        setSelectName(value);
        setDataObj(newObj);
    }  

    // Update a subscription in the database and if there is no exist subscription then create a subscription.
    const subscribe = async (e) => {
        e.preventDefault();
        const data = (await getAll(urlSubs)).data;
        const subscription = data.find(subscription => subscription.memberId === idMember);
        if(!subscription){
            const obj = {memberId:idMember ,movies:[{...dataObj}]};
            await createData(urlSubs,obj);    
        }
        else{
            moviesSubs.push({...dataObj});
            const obj = {...subscription, movies: moviesSubs};
            await updateData(urlSubs, subscription._id, obj);
        }
        updatePage();
    }

    // Returns options in the select according to the movies that the member does not subscribe for them.
    const movies = remainingMovies.map((movie) => {
        return <option key={movie.id} id={movie.id} value={movie.name}>{movie.name}</option>
    }); 
    
    return <div className='subscribeComp'>
        Add a new movie <br/>
        <form onSubmit={subscribe}>
            <select name="movieId" value={selectName} onChange={setSelect} required>
                <option defaultValue disabled></option>
                {movies}
            </select> <input type="date" name="date" onChange={setData} required/> <br/>
            <button className='subscribe' type="submit">Subscribe</button>
        </form>
    </div>;
}

export default SubscribeComp;
