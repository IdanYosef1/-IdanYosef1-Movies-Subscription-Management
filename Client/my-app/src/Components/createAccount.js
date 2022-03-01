import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAll, updateData } from "../utils";
import { InputGroup,FormControl } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";

const url = 'http://localhost:8000/api/users';

function CreateAccount(){
    const [userObj, setUserObj] = useState({username:'', password:''});
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    let history = useHistory();

    useEffect(() => {
        // Bringing the data to the state.
        async function getUsers() {
            try{
                const arr = (await getAll(url)).data;
                setUsers(arr);
            }catch(err){
                console.log(err);
            }
        }
        getUsers();
    },[]);

    // Update the userObj according to the input.
    const setData = (e) => {
        const {name, value} = e.target;
        const newObj = {...userObj};
        newObj[name] = value; 
        setUserObj(newObj);
    }

    // Go to the login page.
    const cancelCreate = () => {
        history.push('/'); 
    }

    // Check account details.
    const sendData = async (e) => {
        e.preventDefault();
        const user = users.find(user => user.username === userObj.username);
        if(!user){
            setMessage('* Incorrect username');
        }
        else{
            try{
                const obj = {...userObj};
                await updateData(url, user._id , obj);
                history.push('/'); // Go to the login page.
            }catch(err){
                console.log(err);
            }
        }
    }

    return <div className="loginAndCreate">
        <h1 className="headerLoginCreate">Create an Account</h1>
        <NavDropdown.Divider className="DividerCreate"/> 
        <span className="message">{message}</span> <br/><br/>
        <form onSubmit={sendData} className="formLoginCreate">
            <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroupPrepend">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
                                fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 
                                    1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 
                                    10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                </svg>
                    </InputGroup.Text>
                          <FormControl
                            type="text" name="username" onChange={setData} required
                            size="sm"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                    </InputGroup>
                    <InputGroup className="mb-3">
                          <InputGroup.Text id="inputGroupPrepend">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
                                fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                                  <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 
                                  0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 
                                  9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 
                                  7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 
                                  0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 
                                  0 4 5z"/>
                                  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                          </InputGroup.Text>
                          <FormControl 
                            type="password"
                            name="password"
                            onChange={setData} 
                            required
                            size="sm"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                          />
                    </InputGroup> <br/>
                    <div>   
                        <button type="submit" variant="success" className="buttonCreate">Create</button> 
                        <button onClick={cancelCreate} variant="danger" className="buttonCancel">Cancel</button>
                    </div>
        </form>    
    </div>;
}

export default CreateAccount;