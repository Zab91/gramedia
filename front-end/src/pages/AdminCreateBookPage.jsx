import axios from "axios";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Navigate } from "react-router-dom";
import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";

const urlAddBook = "http://localhost:2000/book/add";

export const CreateBook = () => {
  const [move, setMove] = useState(false);

  const title = useRef("");
  const author = useRef("");
  const publisher = useRef("");
  const category = useRef("");
  const year = useRef("");

  const addBook = async () => {
    try {
      const addData = {
        title: title.current.value,
        publisher: publisher.current.value,
        author: author.current.value,
        category: category.current.value,
        year: year.current.value,
      };
      console.log(addData);
      const resultAdd = axios.post(urlAddBook, addData);
      console.log(resultAdd);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Book Added",
      });
      setMove(true);
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Book Failed to Added",
      });
    }
  };

  return move ? (
    <Navigate to="/admin" replace={true} />
  ) : (
    <>
      <div className="container">
        <div className="container-add d-flex flex-column justify-content-center align-items-center" />
        <Form.Group className="headerCreate">
          <div className="header">
            <h1> Add Book </h1>
          </div>
        </Form.Group>
        <div className="container-body d-flex flex-column justify-content-center align-items-center">
          <Card>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control placeholder="Input Title" ref={title} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Author</Form.Label>
                <Form.Control placeholder="Input Author" ref={author} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Publisher</Form.Label>
                <Form.Control placeholder="Input Publisher" ref={publisher} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control placeholder="Input Category" ref={category} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Year</Form.Label>
                <Form.Control placeholder="Input Year" ref={year} />
              </Form.Group>
              <div className="container-button d-flex flex-row justify-content-center ">
                <Button variant="success" type="submit" onClick={addBook}>
                  Create
                </Button>
                <Button variant="danger" href="/admin">
                  Cancel
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};
