import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createData } from '../../utils';
import SubscriptionsPage from './subscriptionsPage';
import Row from "react-bootstrap/Col";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { updateMessage } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const urlMembers = 'http://localhost:8000/api/members';

function AddMember() {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  let history = useHistory();
  const [dataObj, setDataObj] = useState({name:'', email:'', city:''});

  // Update the dataObj according to the input.
  const setData = (e) => {
    const {name, value} = e.target;
    const newObj = {...dataObj};
    newObj[name] = value ;
    setDataObj(newObj);
  }

  // Creates a member in the database and back to the subscriptions page.
  // If the email exists in the system he is displayed a suitable message.   
  const saveData = async (e) => {
    try{
      e.preventDefault();
      const data = (await createData(urlMembers, dataObj)).data;
      if(data === 'Added successfully'){
        history.push('/subscriptions');
      }else{
        dispatch(updateMessage('* The email exists in the system'));
      }
    }catch(err){
      console.log(err);
    }
  }

  // Back to the subscriptions page.
  const cancelAdd = () => {
    history.push('/subscriptions');
  }

  return <div>
    <SubscriptionsPage /> <br/><br/>
    <Form className="formAddEdit" onSubmit={saveData}>
            <h3 className="headerAddEdit">Add New Member</h3> 
   
            <Form.Group as={Row} className="groupAddEdit message" >
              <Form.Label>
                {store.message}
              </Form.Label>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3" >
              <Form.Label>
                Name
              </Form.Label>
              <Col>
                <Form.Control  type="text" name="name" onChange={setData} required placeholder="Name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Form.Label>
                  Email
              </Form.Label>
              <Col>
                <Form.Control type="email" name="email" onChange={setData} required placeholder="Email" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3" >
              <Form.Label>
                City
              </Form.Label>
              <Col>
                <Form.Control type="text" name="city" onChange={setData} required placeholder="City" />
              </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                <Button variant="success" type="submit">Save</Button>{" "}
                <Button className='pull-right' variant="danger" onClick={cancelAdd}>Cancel</Button>
              </Col>
            </Form.Group>
        </Form>
  </div>;
}

export default AddMember;

