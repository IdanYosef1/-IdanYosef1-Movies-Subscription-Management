import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { EditMovie } from '../../Redux/actions';
import { deleteData, getAll, updateData } from '../../utils';
import SubscriptionWatch from './subscriptionsWatch';

const url = 'http://localhost:8000/api/subscriptions';
const urlMovies = 'http://localhost:8000/api/movies';

function MovieComp({movieProps, update}) {
    let history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector((state) => state.permissions);
    const [subscriptions, setSubscriptions] = useState([]);

    // Bringing the user's permissions by id and updating the permissions in the redux store.
    useEffect(() => {
        async function getSubscriptions(){
            try{
                const data = (await getAll(url)).data;
                setSubscriptions(data);
            }catch(err){
                console.log(err);
            }
        }
        getSubscriptions();
        return function cleanup(){
            setSubscriptions([]);
        }
    },[]);

    // Returns an array of objects with details according to the members that subscribed for the movie.
    const getSubscription = subscriptions.filter((subscription) => {
            const movieObj = subscription.movies.find((movie) => movie.movieId === movieProps._id);
            if(movieObj){
                return {memberId:subscription.memberId, date:movieObj.date};
            }
            return null;
    })

    /* Updating the movie object in the redux Store and go to the Edit User. */
    const editMovie = () => {
        dispatch(EditMovie(movieProps));
        history.push('/editMovie');
    }

    // Deleting movie information by id from the database and from the subscribers who signed up for the movie.
    // Call a function updatePage from the AllMovies.
    const deleteMovie = async () => {
        try{
            await deleteData(urlMovies ,movieProps._id);
            subscriptions.forEach(async (subscription) => {
                const index = subscription.movies.findIndex((movie) => movie.movieId === movieProps._id);
                if(index !== -1){
                    subscription.movies.splice(index,1);
                    const obj = {...subscription, movies:subscription.movies};
                    await updateData(url, subscription._id, obj);
                }
            })
            update();
        }catch(err){
            console.log(err);
        }
    }

    // Checking permissions and if there is no specific permission then the button is not displayed.
    const showEdit = (store.Update_Movies) ? <button className="editMovieCard" onClick={editMovie}>Edit</button> : null;
    const showDelete = (store.Delete_Movies) ? <button className="deleteMovieCard" onClick={deleteMovie}>Delete</button> : null;

    return <div >
        <Card className="border border-dark movieCard">
            <Card.Body >
                <Card.Title></Card.Title>
                <Card.Img id="movieImg" variant="top" src={`${movieProps.image}`} />
                <Card.Text>
                    <span className='movieName'>{movieProps.name}, {movieProps.premiered.slice(0,4)}</span> <br/>
                    <label className='genres'>
                        <span className='genresField'>genres:</span> {" "}
                        {`"${movieProps.genres.join('", "')}"`}
                    </label>
                    <br/>
                </Card.Text>
                <SubscriptionWatch subscriptions={getSubscription} /> <br/><br/>
                {showEdit} {showDelete}
            </Card.Body>
        </Card>        
    </div>;
}

export default MovieComp;
