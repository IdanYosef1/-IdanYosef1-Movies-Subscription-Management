import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateMessage } from '../../Redux/actions';
import MainPage from '../mainPage';

function SubscriptionsPage() {
  let history = useHistory();
  const dispatch = useDispatch();
  let store = useSelector((state) => state.permissions);
  
  // Go to the Subscriptions.
  // All Members (default).
  const allMembers = () => {
    history.push('/subscriptions');
  }

  /* Go to the Add member and updating the message in the redux Store
     that indicates whether a username exists in the system */
  const addMember = () => {
    dispatch(updateMessage(''));
    history.push('/addMember');
  }

    // Checking permission and if there is no permission then the button is not displayed.
  const clickAddMember = (store.Create_Subscriptions) ? addMember  : null;

  let colorAddUser = 'clickAllAdd', colorEditUser = 'clickAllAdd';
  (window.location.pathname === '/addMember') ? colorAddUser = 'AllAddButtons' : colorEditUser = 'AllAddButtons' ;

  return <div className="text-center"> 
     <MainPage/> 
     <h2>Subscriptions</h2>
     <button className={colorAddUser} onClick={allMembers}>All Members</button>
     <button className={colorEditUser} onClick={clickAddMember}>Add Member</button>
  </div>;
}

export default SubscriptionsPage;
