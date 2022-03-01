import { useState, useEffect } from "react";
import UserComp from "./userComp";
import { getAll, deleteData } from "../../utils";
import UserManagemnt from "./userManagement";
import { useDispatch, useSelector } from "react-redux";
import { EditArraysObj } from "../../Redux/actions";

const urlPerm = 'http://localhost:8000/api/permissions';
const urlUsers = 'http://localhost:8000/api/users';
const urlUsersJson = 'http://localhost:8000/api/usersJson';

function UsersComp(){
    const store = useSelector((state) => state.arraysObj);
    const dispatch = useDispatch();
    const [updatePage,setUpdatePage] = useState(false);

    useEffect(() => {

        // Bringing the data and updating in the redux store.
        async function getData() {
            try{
                const arrUsers = (await getAll(urlUsers)).data;
                const arrUsersJson = (await getAll(urlUsersJson)).data;
                const arrPermissions = (await getAll(urlPerm)).data;
                const obj = {users:arrUsers, usersJson:arrUsersJson, permissions:arrPermissions};
                dispatch(EditArraysObj(obj));
            }catch(err){
                console.log(err);
            }
        }
        getData();
    },[updatePage, dispatch]);

    // Deleting user information by id from the database and Json files.
    const deleteuser = async (id) => {  
        try{
            await deleteData(urlUsers, id);
            await deleteData(urlUsersJson, id);
            await deleteData(urlPerm, id);
            setUpdatePage(!updatePage);
        }catch(err){
            console.log(err);
        }
    }

    // Returns an object that contains the user's permissions
    const getPermissionsObj = (i) => {
        const arrPermissions = store.permissions[i].permissions;
        const obj = {View_Subscriptions:false, Create_Subscriptions:false, Delete_Subscriptions:false,
            Update_Subscriptions:false, View_Movies:false, Create_Movies:false, Delete_Movies:false, Update_Movies:false};
        arrPermissions.forEach((checkBox) => {
            obj[checkBox.replace(' ','_')] = true;
        });
        return obj;
    }

    // Render the UserComp does not include the first user representing the admin.
    const getUsers = store.users.map((user,index) => {
                        if(index === 0){
                            return null;
                        }
                        const obj = {
                            id:user._id,
                            firstname:store.usersJson[index].firstname,
                            lastname:store.usersJson[index].lastname,
                            username:user.username,
                            createdDate:store.usersJson[index].createdDate,
                            permissionsObj: getPermissionsObj(index), 
                            permissions:store.permissions[index].permissions.join(', ')
                        };
                        return  <UserComp key={user._id} userObj={obj} deleteCall={deleteuser} />;
                    });

    return <div>
        <UserManagemnt/>
        <div className="allUsersCards">
            {getUsers}
        </div>
    </div>;
}

export default UsersComp;
