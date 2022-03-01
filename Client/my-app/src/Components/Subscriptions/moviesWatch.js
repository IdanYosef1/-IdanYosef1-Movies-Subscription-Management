
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Context from '../../context';
import SubscribeComp from './subscribeComp';

function MoviesWatch() {
    let store = useSelector((state) => state.permissions);
    const {value1} = useContext(Context);
    const [movies] = value1;
    const [clickSubs, setClickSubs] = useState(false);

    /* Returns a list of the movies that the member subscribed for them.*/
    // If the user has permission to view the movies then the link takes him to the page of the movie details.   
    const showMovies = movies.map((movie) => {
        const clickMovieName = (store.View_Movies) ? `/movies/${movie.movieId}` : '/subscriptions';
        return <li key={movie.movieId}> <Link className='linkSubsMovie' to={clickMovieName}>
                                            {movie.name}
                                        </Link>, {movie.date.slice(0,10)} </li>;
    });

    // Clicking on the button opens or closes the movies list.
    const subscribe = () => {
        setClickSubs(!clickSubs);
    };

    // Checking permission and if there is no permission then the button is inactive.
    const clickSubscribe = (store.Create_Subscriptions) ? subscribe : null;

    return  <div className='moviesandSubsWatch'>
                <h3 className='text-center'>Movies Watched</h3>
                <button className='subscribeMovie' onClick={clickSubscribe}>Subscribe to new movie</button> <br/>
                {clickSubs ? <SubscribeComp /> : null}
                <ul>
                    {showMovies}
                </ul>
            </div>;
}

export default MoviesWatch;

