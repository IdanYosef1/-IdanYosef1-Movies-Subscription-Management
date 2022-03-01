import React, { useEffect, useState } from 'react';
import { getAll } from '../../utils';
import MovieComp from './movieComp';
import MoviesPage from './moviesPage';

const urlMovies = 'http://localhost:8000/api/movies';

function AllMovies({ match }) {
  const [wordsToSearch, setwordsToSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [showChange, setShowChange] = useState(false);

  useEffect(() => {
    // Bringing the data to the state and update the searchMovies according to the existence of the id in the url.
    async function getData() {
      try{
        const data = (await getAll(urlMovies)).data;
        (match.params.id !== undefined) ?
        setSearchMovies(data.filter(movie => movie._id === match.params.id))
        : setSearchMovies(data);
        setMovies(data);
      }catch(err){
        console.log(err);
      }
    }
    getData();
    return function cleanup(){
      setMovies([]);
    }
  },[showChange, match.params.id]);

  // Renders the component.
  const updatePage = () => {
    setShowChange(!showChange);
  }

  // Updates the searchMovies according to the words in the search.
  const findMovies = () => {
    setSearchMovies(movies.filter(movie => movie.name.toLowerCase().includes(wordsToSearch.toLowerCase())));
  } 

  // Render the MovieComp according to the searchMovies array.
  const showMovies = searchMovies.map((movie) => {
    return <MovieComp key={movie._id} movieProps={movie} update={updatePage} />
 });
  
  return  <div>
              <MoviesPage />
              <div className='divAllMovies'>
                <div  className='findMovie'>
                    <input className="inputFind" type="text"
                     onChange={(e) => setwordsToSearch(e.target.value)} placeholder="Find Movie" />
                    <button className="buttonFind" onClick={findMovies}>Find</button>
                </div>
              </div>  
              <br/><br/>
              <div className="allMoviesCards">
                      {showMovies}
              </div>
          </div>;
}

export default AllMovies;

