import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { updateData } from '../../utils';
import MainPage from '../mainPage';

import Row from "react-bootstrap/Col";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const urlMembers = 'http://localhost:8000/api/members';

function EditMember() {
  let history = useHistory();
  const store = useSelector((state) => state.member);
  const [dataObj, setDataObj] = useState({name:store.name, email:store.email, city:store.city});

  // Update the dataObj according to the input.  
  const setData = (e) => {
    const {name, value} = e.target;
    const newObj = {...dataObj};
    newObj[name] = value;
    setDataObj(newObj);
  }

  // Update a member in the database and back to the subscriptions page.
  const editData = async (e) => {
    try{
      e.preventDefault();
      await updateData(urlMembers, store._id, dataObj);
      history.push('/subscriptions');
    }catch(err){
      console.log(err);
    }
  }

  // Back to the subscriptions page.
  const cancelAdd = () => {
    history.push('/subscriptions');
  }

  return <div>
    <MainPage /> 
    <h2 className="text-center">Members</h2> <br/>
    <Form className="formAddEdit" onSubmit={editData}>
            <h3 className="headerAddEdit">Edit Member: {dataObj.name}</h3> 
            <Form.Group as={Row} className="groupAddEdit mb-3" >
              <Form.Label>
                Name
              </Form.Label>
              <Col>
                <Form.Control  type="text" name="name" value={dataObj.name} onChange={setData} required placeholder="Name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Form.Label>
                  Email
              </Form.Label>
              <Col>
                <Form.Control type="email" name="email" value={dataObj.email} onChange={setData} required placeholder="Email" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3" >
              <Form.Label>
                City
              </Form.Label>
              <Col>
                <Form.Control type="text" name="city" value={dataObj.city} onChange={setData} required placeholder="City" />
              </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Col >
                  <Button variant="success" type="submit">Update</Button>{" "}
                  <Button variant="danger" onClick={cancelAdd}>Cancel</Button>
              </Col>
            </Form.Group>
        </Form>
  </div>;
}

export default EditMember;
