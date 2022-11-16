import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";

// Bootstrap
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// CSS
import "../css/style.css";

export const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState();

  const url = "http://localhost:2000/book/";

  const getBooks = async () => {
    try {
      const newURL = category ? url + `filter?data=${category}` : `${url}all`;
      const res = await Axios.get(newURL);
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="container">
      <DropdownButton id="dropdown-item-button" title="Filter">
        <Dropdown.Item as="button" onClick={() => {
          setCategory();
        }}>
          All
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={() => {
            setCategory("romance");
          }}
        >
          Romance
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={() => {
            setCategory("action");
          }}
        >
          Action
        </Dropdown.Item>
      </DropdownButton>

      <div className="containerHome">
        {books.map((item, index) => {
          return (
            <Card className="cardCont" key={index}>
              <Card.Img
                variant="top"
                src="https://cdn.gramedia.com/uploads/items/9786020333519_RICH-DADS---.jpg"
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
