import './style.css';
import {Switch,Route} from 'react-router-dom';
import LoginPage from './Components/loginPage';
import CreateAccount from './Components/createAccount'
import MainPage from './Components/mainPage';
import AddUserComp from './Components/Users Managemment/addUserComp';
import UsersComp from './Components/Users Managemment/usersComp';
import EditUserComp from './Components/Users Managemment/editUserComp';
import EditMovie from './Components/Movies/editMovie';
import AddMovie from './Components/Movies/addMovie';
import EditMember from './Components/Subscriptions/editMember';
import AddMember from './Components/Subscriptions/addMember';
import AllMovies from './Components/Movies/allMovies';
import AllMembers from './Components/Subscriptions/allMembers';
import { useSelector } from 'react-redux';


function App() {
  
  const store = useSelector(state => state);
  return (
      <div className="page">
      <Switch>
        <Route path='/' component={LoginPage} exact/>
        <Route path='/createAccount' component={CreateAccount} />
        <Route path='/main/:username' component={MainPage} />
        { // If the user is not an admin then he does not have access to the User Management.
        store.isManager ? [<Route path='/userManagement/:username' key={1} component={UsersComp} />,
                  <Route path='/addUser' key={2} component={AddUserComp} />,
                  <Route path='/editUser' key={3} component={EditUserComp} />] 
                  : null}
        <Route path='/movies/:id?' component={AllMovies} /> 
        <Route path='/editMovie' component={EditMovie} />
        <Route path='/addMovie' component={AddMovie} />
        <Route path='/subscriptions/:id?' component={AllMembers} />
        <Route path='/editMember' component={EditMember} />
        <Route path='/addMember' component={AddMember} />
      </Switch>
    </div>
  );
}

export default App;
