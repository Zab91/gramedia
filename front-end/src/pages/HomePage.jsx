import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";

// Bootstrap
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";

// CSS
import "../css/style.css";

export const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState();
  const [sort, setSort] = useState();
  const [direction, setDirection] = useState();
  const [pagination, setPagination] = useState(0);
  const [page, setPage] = useState(1);
  const [num, setNum] = useState(0);

  const url = "http://localhost:2000/book/";

  const getBooks = async () => {
    try {
      const newURL = category
        ? url + `filter?genre=${category}&`
        : `${url}all?`;
      const sortURL = sort ? newURL + `sort=${sort}&` : newURL;

      // if (num === 0) {
      //   setDirection();
      // } else if (num === 1) {
      //   setDirection("ASC");
      // } else if (num === 2) {
      //   setDirection("DESC");
      // }

      const directionURL = direction
        ? sortURL + `direction=${direction}&`
        : sortURL;

      const paginationURL = directionURL + `pagination=${pagination}`;

      const res = await Axios.get(paginationURL);
      // console.log(num);
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const pageCounter = () => {
  //   if (page > 0) {
  //     setPage(page + 1)
  //   }
  // }

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort, direction, pagination, num]);

  // const counter = () => {
  //   num++;
  //   if (num > 2) {
  //     num = 0;
  //   }
  // };

  return (
    <div className="container">
      <div className="container-sort d-flex flex-row justify-content-space-between ">
        <DropdownButton id="dropdown-item-button" title="Book Filter">
          <Dropdown.Item
            as="button"
            onClick={() => {
              setCategory();
              setSort();
              setDirection();
            }}
          >
            All
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setCategory("romance");
              setSort();
              setDirection();
              setPagination(0);
              setPage(1);
            }}
          >
            Romance
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setCategory("horror");
              setSort();
              setDirection();
              setPagination(0);
              setPage(1);
            }}
          >
            Horror
          </Dropdown.Item>
        </DropdownButton>

        <DropdownButton id="dropdown-item-button" title="Sort By">
          <Dropdown.Item
            as="button"
            onClick={() => {
              setSort("title");
              setDirection("ASC");
              setPagination(0);
              setPage(1);
            }}
          >
            Title ASC
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setSort("title");
              setDirection("DESC");
              setPagination(0);
              setPage(1);
            }}
          >
            Title DESC
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              num >= 2 ? setNum(0) : setNum(num + 1);
            }}
          >
            Title
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="containerHome">
        {books.map((item, index) => {
          return (
            <a href={`/book/${item.id}`} key={index}>
              <Card className="cardCont">
                <Card.Img
                  variant="top"
                  src="https://cdn.gramedia.com/uploads/items/9786020333519_RICH-DADS---.jpg"
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                </Card.Body>
              </Card>
            </a>
          );
        })}
      </div>

      <div className="containerButton d-flex flex-row justify-content-center align-item-center margin-top-1em ">
        {books.length === 10 ? (
          <div>
            <Button
              variant="primary"
              onClick={() => {
                setPagination(pagination + 8);
                setPage(page + 1);
              }}
            >
              Next
            </Button>
            {/* <Button
              variant="primary"
              onClick={() => {
                setPagination(pagination + 8);
                setPage(page + 1);
              }}
            >
              Last
            </Button> */}
          </div>
        ) : (
          <Button variant="primary" disabled>
            Next
          </Button>
        )}

        <h5>
          Page
          <br></br>
          <div className="d-flex flex-row justify-content-center">{page}</div>
        </h5>

        {page !== 1 ? (
          <div>
            <Button
              variant="primary"
              onClick={() => {
                setPagination(pagination - 8);
                setPage(page - 1);
              }}
            >
              Previous
            </Button>
            {/* <Button
              variant="primary"
              onClick={() => {
                setPagination(0);
                setPage(1);
              }}
            >
              First
            </Button> */}
          </div>
        ) : (
          <div>
            <Button variant="primary" disabled>
              Previous
            </Button>
            {/* <Button variant="primary" disabled>
              first
            </Button> */}
          </div>
        )}
      </div>
    </div>
  );
};
