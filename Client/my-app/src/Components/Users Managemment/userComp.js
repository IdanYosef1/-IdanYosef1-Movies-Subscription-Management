import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUser } from '../../Redux/actions';
import Card from 'react-bootstrap/Card';

function UserComp({userObj, deleteCall}){
    const dispatch = useDispatch();
    let history = useHistory();

    // Call a function deleteuser from the usersComp.
    const deleteUser = () => {
        deleteCall(userObj.id);
    }

     /* Go to the Edit User and updating the user object in the redux Store. */
    const editUser = () => {
        dispatch(updateUser(userObj));
        history.push('/editUser');
    }

    const permissions = (userObj.permissions.length > 0) ? userObj.permissions : "No Permissions";

    return <div>
            <Card className="border border-dark userCard">
              <Card.Body>
                <Card.Text>
                    <span className="spanCard">Name:</span> {userObj.firstname + ' ' + userObj.lastname} <br/>
                    <span className="spanCard">UserName:</span> {userObj.username} <br/>
                    <span className="spanCard">Created Date:</span> {userObj.createdDate} <br/>
                    <span className="spanCard">Permissions:</span> {permissions} <br/>
                </Card.Text>
                <button className="editUserCard" onClick={editUser}>Edit</button>
                <button className="deleteUserCard" onClick={deleteUser}>Delete</button>
              </Card.Body>
            </Card> 
        <br/><br/>
    </div>;
}

export default UserComp;