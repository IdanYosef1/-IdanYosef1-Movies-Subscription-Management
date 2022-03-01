import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isLogin, isManager, updatePerm } from '../Redux/actions';
import { getAll } from '../utils';
import { Nav } from 'react-bootstrap';
import { MdLogout } from 'react-icons/md';

const urlPerm = "http://localhost:8000/api/permissions";

function MainPage(){
    const store = useSelector(state => state);
    const loginData = store.loginData;
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        // Bringing the user's permissions by id and updating the permissions in the redux store.
        async function getPerm(){
            try{
                const perm = (await getAll(`${urlPerm}/${loginData._id}`)).data; 
                const obj = {View_Subscriptions:false, Create_Subscriptions:false, Delete_Subscriptions:false,
                    Update_Subscriptions:false, View_Movies:false, Create_Movies:false, Delete_Movies:false, Update_Movies:false};
                perm.permissions.forEach((perm) => {
                    obj[perm.replace(' ', '_')] = true;
                })
                dispatch(updatePerm(obj));
            }catch(err){
                console.log(err);
            }
        }
        getPerm();
    },[dispatch, loginData._id]);

    useEffect(() => {
        // Show a message to the user if he is not logged in and return him to the login page.
        async function getData(){
            if(!store.islogin){
                alert("Reconnect to the site");
                history.push(`/`);
            }
        }
        getData();
    },[history, store.islogin]);

    // Go to the User Management.
    const userManagement = (e) => {
        history.push(`/userManagement/admin`);
    }

    // Go to the Movies.
    const moviesPage = (e) => {
        history.push('/movies');
    }

    // Go to the Subscriptions.
    const subscriptionsPage = (e) => {
        history.push('/subscriptions');
    }

    // Updating the data in the redux store and Go to the login page.
    const logOut = () => {
        dispatch(isManager(false));
        dispatch(isLogin(false));
        history.push(`/`);
    }

    // Checking permissions and if there is no specific permission then the button is inactive.
    const clickMovies = (store.permissions.View_Movies) ? moviesPage : null;
    const clickSubs = (store.permissions.View_Subscriptions) ? subscriptionsPage : null;

    let moviesButton = 'inactiveButton', subsButton = 'inactiveButton',
        userManageButton = 'inactiveButton', logoutButton = 'logOutButton';

    switch (window.location.pathname) {
        case '/movies':
        case '/addMovie':
        case '/editMovie':         
            moviesButton = 'activeButton'; 
            break;
        case '/subscriptions':
        case '/addMember':    
        case '/editMember':
            subsButton = 'activeButton'; 
            break;
        case '/userManagement/admin':
        case '/addUser':
        case '/editUser':    
            userManageButton = 'activeButton'; 
            break;      
        default:
            break;
    }


    return <div className="text-center">
        <nav className="nav"  variant="dark">
            <span className="text-nav">Movies & Subscription management</span> 
            <nav className="buttons-nav">
              <Nav.Item > 
              <button className={moviesButton} onClick={clickMovies}>Movies</button>
              </Nav.Item>
              <Nav.Item>
                <button className={subsButton} onClick={clickSubs}>Subscriptions</button>
              </Nav.Item>
              <Nav.Item>
              {
                (store.isManager === true) ? 
                <button className={userManageButton} onClick={userManagement}>User Management</button>
                : null
              } 
              </Nav.Item>
              <Nav.Item>
                    <button className={logoutButton} onClick={logOut}><MdLogout className='iconLogout' /> Log Out</button>
              </Nav.Item>
            </nav>
        </nav>
        <h1>Movies - Subscriptions Web Site</h1>
        <h2>Hello {loginData.username} !</h2>

    </div>;
}
 
export default MainPage;