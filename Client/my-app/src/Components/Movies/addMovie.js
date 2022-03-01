import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createData } from "../../utils";
import MoviesPage from "./moviesPage";
import Row from "react-bootstrap/Col";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const urlMovies = "http://localhost:8000/api/movies";

function AddMovie() {
  let history = useHistory();
  const [dataObj, setDataObj] = useState({
    name: "",
    genres: "",
    image: "",
    premiered: "",
  });

  // Update the dataObj according to the input.
  const setData = (e) => {
    const { name, value } = e.target;
    const newObj = { ...dataObj };
    newObj[name] = value;
    setDataObj(newObj);
  };

  // Creates a movie in the database and back to the movies page.
  const saveData = async (e) => {
    try {
      e.preventDefault();
      const obj = {
        ...dataObj,
        genres: dataObj.genres.split(",").map(str => str.replace(/\s+/g, ' ').trim())
      };
      await createData(urlMovies, obj);
      history.push("/movies");
    } catch (err) {
      console.log(err);
    }
  };

  // Back to the movies page.
  const cancelAdd = () => {
    history.push("/movies");
  };

  return (
    <div>
      <MoviesPage /> <br />
      <br />
      <Form className="formAddEdit" onSubmit={saveData}>
        <h3 className="headerAddEdit">Add New Movie</h3> <br />
        <Form.Group as={Row} className="groupAddEdit mb-3">
          <Form.Label>
            Name
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              name="name"
              onChange={setData}
              required
              placeholder="Name"
            />
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
              onChange={setData}
              required
              placeholder="Genres"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="groupAddEdit mb-3">
          <Form.Label>
            Image url
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              name="image"
              onChange={setData}
              required
              placeholder="Image url"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="groupAddEdit mb-3">
          <Form.Label>
            Premiered
          </Form.Label>
          <Col>
            <Form.Control
              type="date"
              name="premiered"
              onChange={setData}
              required
              placeholder="Premiered"
            />
          </Col>
        </Form.Group>
        <br />
        <Form.Group as={Row} className="groupAddEdit mb-3">
          <Col>
            <Button variant="success" type="submit">
              Save
            </Button>{" "}
            <Button variant="danger" onClick={cancelAdd}>
              Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default AddMovie;
