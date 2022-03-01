import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { updateData } from '../../utils';

import Row from "react-bootstrap/Col";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MainPage from '../mainPage';

const urlMovies = 'http://localhost:8000/api/movies';

function EditMovie() {
  let history = useHistory();
  const store = useSelector((state) => state.movie);
  const [dataObj, setDataObj] = useState({name:store.name, genres:store.genres.join(),
                                      image:store.image, premiered:store.premiered.slice(0,10)});
  
  // Update the dataObj according to the input.                                    
  const setData = (e) => {
    const {name, value} = e.target;
    const newObj = {...dataObj};
    newObj[name] = value;
    setDataObj(newObj);
  }

  // Update a movie in the database and back to the movies page.
  const editData = async (e) => {
    try{
      e.preventDefault();
      const obj = {...dataObj,
                      genres:dataObj.genres.split(",").map(str => str.replace(/\s+/g, ' ').trim())
                  };
      await updateData(urlMovies,store._id ,obj);
      history.push('/movies');
    }catch(err){
      console.log(err);
    }
  }

  // Back to the movies page.
  const cancelAdd = () => {
    history.push('/movies');
  }
/* <MoviesPage /> */
  return <div> 
    <MainPage />
    <h2 className="text-center">Movies</h2> <br/>
    <Form className="formAddEdit" onSubmit={editData}>
            <h3 className="headerAddEdit">Edit Movie: {dataObj.name}</h3> <br />
            <Form.Group as={Row} className="groupAddEdit mb-3" >
              <Form.Label>
                Name
              </Form.Label>
              <Col>
                  <Form.Control 
                  type="text" 
                  name="name" 
                  value={dataObj.name} 
                  onChange={setData} 
                  required 
                  placeholder="Name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3">
              <Form.Label>
                Genres
              </Form.Label>
              <Col>
                  <Form.Control 
                  type="text" 
                  name="genres" 
                  value={dataObj.genres} 
                  onChange={setData} 
                  required 
                  placeholder="Genres" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3" >
              <Form.Label>
                Image url
              </Form.Label>
              <Col>
                  <Form.Control 
                  type="text" 
                  name="image" 
                  value={dataObj.image} 
                  onChange={setData} 
                  required 
                  placeholder="Image url" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="groupAddEdit mb-3" >
              <Form.Label>
                Premiered
              </Form.Label>
              <Col>
                <Form.Control 
                type="date" 
                name="premiered" 
                value={dataObj.premiered} 
                onChange={setData} 
                required 
                placeholder="Premiered" />
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

export default EditMovie;
