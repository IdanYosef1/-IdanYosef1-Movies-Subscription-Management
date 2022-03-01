import { useState } from "react";
import { useHistory } from "react-router-dom";
import UserManagement from "./userManagement";
import { createData } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage } from "../../Redux/actions";

import Row from "react-bootstrap/Col";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const urlPerm = 'http://localhost:8000/api/permissions';
const urlUsers = 'http://localhost:8000/api/users';
const urlUsersJson = 'http://localhost:8000/api/usersJson';

function AddUserComp(){
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const [dataObj, setDataObj] = useState({firstName:'', lastName:'', userName:''});
    const [perm, setPerm] = useState({View_Subscriptions:false, Create_Subscriptions:false, Delete_Subscriptions:false,
        Update_Subscriptions:false, View_Movies:false, Create_Movies:false, Delete_Movies:false, Update_Movies:false});
    let history = useHistory();
    
    // Update the dataObj according to the input.
    const setData = (e) => {
        const {name, value} = e.target;
        const newObj = {...dataObj};
        newObj[name] = value;
        setDataObj(newObj);
    }

    // Update the Perm according to the input.
    const setCheckBox = (e) => {
        const {name, checked} = e.target;
        const newObj = {...perm};
        newObj[name] = checked;
        setPerm(newObj);
    }

    /* Checks if the username exists in the system and creates a user of the database,
       Json file and permissions of that user in another Json file. */
    // If the user exists in the system he is displayed a suitable message.   
    const saveData = async (e) => {
        e.preventDefault();
            try{
                const obj = {username: dataObj.userName};
                const userId = (await createData(urlUsers, obj)).data._id;
                if(userId){
                  await createUserJson(userId);
                  await createPermissions(userId);
                  history.push(`/userManagement/admin`); // Go to the User Management.
                }
                else{
                  dispatch(updateMessage('* The username exists in the system'))
                }
                
            }catch(err){
                console.log(err);
            }
    }

    // Creates a user in the Json file.
    const createUserJson = async (userId) => {
        const newObjJson = {
            id: userId,
            firstname: dataObj.firstName,
            lastname:dataObj.lastName,
            createdDate: new Date().toLocaleDateString()
        };
        await createData(urlUsersJson, newObjJson);
    }

    // Creates a permissions of the user in another Json file.
    const createPermissions = async (userId) => {
        const arr = [];
        const newObj = {...perm};
        newObj["View_Subscriptions"] = setCheckedSubs();
        newObj["View_Movies"] = setCheckedMovies();
        Object.entries(newObj).forEach(([key, value]) => {
            if(value === true){
                const permission = key.replace('_',' '); 
                arr.push(permission);
            }
        }); 
        const newObjPerm = {
            id: userId,
            permissions: arr
        };
        await createData(urlPerm, newObjPerm);
    }

    // Back to the User Management.
    const cancelAddUser = () => {
        history.push(`/userManagement/admin`);
    }

    /*  click on "View Subscriptions", "Create Subscriptions", "Update Subscriptions" and
        "Delete Subscriptions" inputs will automatically check the "View Subscriptions" checkbox. */

    const setCheckedSubs = () => {
        return perm.View_Subscriptions || perm.Create_Subscriptions
        || perm.Delete_Subscriptions || perm.Update_Subscriptions;
    }

    /*  click on "View Movies", "Create Movies", "Update Movies" and "Delete Movies" inputs will automatically 
        check the "View Movies" checkbox. */
    const setCheckedMovies = () => {
        return perm.View_Movies || perm.Create_Movies 
        || perm.Delete_Movies || perm.Update_Movies;
    }

    return <div>
        <UserManagement />
        <Form className="formAddEdit" onSubmit={saveData}>
            <h3 className="headerAddEdit">Add New User</h3>  
            <Form.Group as={Row} className="groupAddEdit message" >
              <Form.Label>
                {store.message}
              </Form.Label>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3" >
              <Form.Label>
                First Name
              </Form.Label>
              <Col >
                <Form.Control type="text" name="firstName" onChange={setData} required placeholder="First Name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Form.Label>
                  Last Name
              </Form.Label>
              <Col>
                <Form.Control type="text" name="lastName" onChange={setData} required placeholder="Last Name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3" >
              <Form.Label>
                User Name
              </Form.Label>
              <Col>
                <Form.Control type="text" name="userName" onChange={setData} required placeholder="User Name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit  mb-3" >
              <Form.Label className="groupAddEdit">
                  Permissions:
              </Form.Label>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                <Form.Check type="checkbox" label="View Subscriptions" name="View_Subscriptions"
                            checked={setCheckedSubs()} onChange={setCheckBox} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
              <Form.Check type="checkbox" label="Create Subscriptions" name="Create_Subscriptions"
                          onChange={setCheckBox}  />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                <Form.Check type="checkbox" label="Delete Subscriptions" name="Delete_Subscriptions" 
                            onChange={setCheckBox} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                <Form.Check type="checkbox" label="Update Subscriptions" name="Update_Subscriptions"
                            onChange={setCheckBox}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                <Form.Check type="checkbox" label="View Movies" name="View_Movies"
                            checked={setCheckedMovies()} onChange={setCheckBox} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                <Form.Check type="checkbox" label="Create Movies" name="Create_Movies"
                            onChange={setCheckBox} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                <Form.Check type="checkbox" label="Delete Movies" name="Delete_Movies"
                            onChange={setCheckBox} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                <Form.Check type="checkbox" label="Update Movies" name="Update_Movies"
                            onChange={setCheckBox} />
              </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                  <Button variant="success" type="submit">Save</Button>{" "}
                  <Button variant="danger" onClick={cancelAddUser}>Cancel</Button>
              </Col>
            </Form.Group>
        </Form>
    </div>
}

export default AddUserComp;