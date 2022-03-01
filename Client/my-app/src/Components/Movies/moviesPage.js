import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MainPage from '../mainPage';

function MoviesPage() {
  let history = useHistory();
  let store = useSelector((state) => state.permissions);
  
  // Go to the Movies.
  // All Movies (default).
  const allMovies = () => {
      history.push('/movies');
  }

  // Go to the Add movie.
  const addMovie = () => {
    history.push('/addMovie'); 
  }
  
  // Checking permission and if there is no permission then the button is not displayed.
  const clickAddMovie = (store.Create_Movies) ? addMovie : null;

  let colorAddUser = 'clickAllAdd', colorEditUser = 'clickAllAdd';
  (window.location.pathname === '/addMovie') ? colorAddUser = 'AllAddButtons' : colorEditUser = 'AllAddButtons' ;

  return  <div className="text-center">
            <MainPage/>
            <h2>Movies</h2>
            <button className={colorAddUser} onClick={allMovies}>All Movies</button>
            <button className={colorEditUser} onClick={clickAddMovie}>Add Movie</button>
          </div>;
}

export default MoviesPage;
