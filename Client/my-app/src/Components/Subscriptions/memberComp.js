import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteData, getAll, getById } from '../../utils';
import MoviesWatch from './moviesWatch';
import Context from '../../context';
import { EditMember } from '../../Redux/actions';
import { Card } from 'react-bootstrap';

const urlSubs = 'http://localhost:8000/api/subscriptions';
const urlMovies = 'http://localhost:8000/api/movies';
const urlMembers = 'http://localhost:8000/api/members';

function MovieComp({member, update}) {
    let history = useHistory();
    const dispatch = useDispatch();
    let store = useSelector((state) => state.permissions);
    const [movies, setMovies] = useState([]);
    const [subs, setSubs] = useState({});
    const [showChange, setShowChange] = useState(false);

    // Bringing the data to the state.
    useEffect(() => {
        async function getMovies(){
            try{
                const data = (await getAll(urlSubs)).data;
                const subscription = data.find((subscription) => subscription.memberId === member._id);
                let arr = [];
                if(subscription){
                    arr = subscription.movies.map(async(movieObj) => {
                        const moviesData = (await getById(urlMovies, movieObj.movieId)).data
                        return {...movieObj, name:moviesData.name}
                    });
                    arr = await Promise.all(arr);
                }
                setSubs(subscription);
                setMovies(arr);
            }catch(err){
                console.log(err);
            }
        }
        getMovies();
        return function cleanup(){
            setSubs({});
        }
    },[showChange, member._id]);

    // Renders the component.
    const updatePage = () => {
        setShowChange(!showChange);
    }

    /* Updating the member object in the redux Store and go to the Edit Member. */
    const editMember = () => {
        dispatch(EditMember(member));
        history.push('/editMember');
    }

    // Deleting member information by id from the database and the member's subscription if it exists in the database.
    const deleteMember = async () => {
        try{
            if(subs !== undefined){
                await deleteData(urlSubs, subs._id);
            }
            await deleteData(urlMembers, member._id);
            update();
        }catch(err){
            console.log(err);
        }
    }
    
    // Checking permissions and if there is no specific permission then the button is not displayed.
    const showEdit = (store.Update_Subscriptions) ?
                     <button className="editMemberCard" onClick={editMember}>Edit</button> : null;
    const showDelete = (store.Delete_Subscriptions) ? 
                       <button className="deleteMemberCard" onClick={deleteMember}>Delete</button> : null;
    
    return  <Context.Provider value={{value1:[movies], value2:[member._id], value3:[updatePage]}} >
                <Card className='border border-dark memberCard'>
                    <Card.Body>
                        <div className='fw-bold'>
                            {member.name}
                        </div>
                        <Card.Text>
                            <span className="spanCard">Email:</span> {member.email}  <br/>
                            <span className="spanCard">City:</span> {member.city} <br/>
                        </Card.Text> 
                        {showDelete} {showEdit}  <br/><br/>
                        <MoviesWatch /> 
                    </Card.Body>
                </Card> 
            </Context.Provider>    
}

export default MovieComp;
