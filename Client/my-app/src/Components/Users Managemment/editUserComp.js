import { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateData } from "../../utils";
import { useSelector } from "react-redux";

import Row from "react-bootstrap/Col";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MainPage from "../mainPage";

const urlUsers = 'http://localhost:8000/api/users';
const urlUsersJson = 'http://localhost:8000/api/usersJson';
const urlPermissions = 'http://localhost:8000/api/permissions';

function EditUserComp(){
    const store = useSelector((state) => state);
    const [perm, setPerm] = useState(store.user.permissionsObj);
    const [dataObj, setDataObj] = useState({firstName:`${store.user.firstname}`, 
                                        lastName:`${store.user.lastname}`, userName:`${store.user.username}`});
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

    /* Checks if the username exists in the system and updates a user in the database,
       in the Json file and updates the permissions of that user in another Json file. */  
    const saveData = async (e) => {
        e.preventDefault();
        try{
            const userId = store.user.id;
            await updateUser(userId);
            await updateUserJson(userId);
            await updatePermissions(userId);
            history.push(`/userManagement/admin`); // Go to the User Management.
        }catch(err){
            console.log(err);
        }
    }

    // Updating the user in the database.
    const updateUser = async (userId) => {
        const obj = {username: dataObj.userName};
        await updateData(urlUsers,userId, obj).data;
    }

    // Updating the user in the Json file.
    const updateUserJson = async (userId) => {
        const newObjJson = {
            id: userId,
            firstname: dataObj.firstName,
            lastname:dataObj.lastName,
            createdDate: store.user.createdDate
        };
        await updateData(urlUsersJson, userId, newObjJson);
    }

    // Updating the permissions of the user in another Json file.
    const updatePermissions = async (userId) => {
        const arr = [];
        const newObj = {...perm};
        newObj["View_Subscriptions"] = setCheckedSubs();
        newObj["View_Movies"] = setCheckedMovies();
        Object.entries(newObj).forEach(([key, value]) => {
            if(value === true){
                const permission = key.replace('_', ' '); 
                arr.push(permission);
            }
        }); 
        const newObjPerm = {
            id: userId,
            permissions: arr
        };
        await updateData(urlPermissions, userId, newObjPerm);
    }

      // Back to the User Management.
    const cancelEditUser = () => {
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
        <MainPage /> 
        <h2 className="text-center">Users</h2> <br/>
        <Form className="formAddEdit" onSubmit={saveData}>
            <h3 className="headerAddEdit">Edit User: {dataObj.firstName + ' ' + dataObj.lastName} </h3> 
            <Form.Group as={Row} className="groupAddEdit mb-3" >
              <Form.Label>
                First Name
              </Form.Label>
              <Col>
                <Form.Control  type="text" value={dataObj.firstName} name="firstName"
                               onChange={setData} required  placeholder="First Name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Form.Label>
                  Last Name
              </Form.Label>
              <Col>
                <Form.Control type="text" value={dataObj.lastName} name="lastName"
                              onChange={setData} required placeholder="Last Name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3" >
              <Form.Label>
                User Name
              </Form.Label>
              <Col>
                <Form.Control type="text" value={dataObj.userName} name="userName"
                              onChange={setData} required placeholder="User Name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3" >
              <Form.Label className="groupAddEdit" >
                  Created date: {store.user.createdDate}
              </Form.Label>
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
                           checked={perm.Create_Subscriptions} onChange={setCheckBox}  />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                <Form.Check type="checkbox" label="Delete Subscriptions" name="Delete_Subscriptions" 
                             checked={perm.Delete_Subscriptions} onChange={setCheckBox} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                <Form.Check type="checkbox" label="Update Subscriptions" name="Update_Subscriptions"
                             checked={perm.Update_Subscriptions} onChange={setCheckBox}/>
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
                            checked={perm.Create_Movies} onChange={setCheckBox} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                <Form.Check type="checkbox" label="Delete Movies" name="Delete_Movies"
                            checked={perm.Delete_Movies} onChange={setCheckBox} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                <Form.Check type="checkbox" label="Update Movies" name="Update_Movies"
                            checked={perm.Update_Movies} onChange={setCheckBox} />
              </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                <Button variant="success" type="submit">Update</Button>{" "}
                <Button variant="danger" onClick={cancelEditUser}>Cancel</Button>
              </Col>
            </Form.Group>
        </Form>
    </div>;
}

export default EditUserComp;