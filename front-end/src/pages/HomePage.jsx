import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";

// Redux
import { useSelector } from "react-redux";

// Bootstrap
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";

// CSS
import "../css/home.css";

export const HomePage = () => {
  const { NIM } = useSelector((state) => state.userSlice.value);
  // console.log(NIM);

  const url = "http://localhost:2000/book/";
  const urlT = "http://localhost:2000/transaction/";

  // Books
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState();
  const [sort, setSort] = useState();
  const [direction, setDirection] = useState();
  const [pagination, setPagination] = useState(0);
  const [page, setPage] = useState(1);
  const [num, setNum] = useState(0);

  // Transaction
  const [bookID, setBookID] = useState();

  const addLoan = async () => {
    try {
      const newURL = urlT + `add/${NIM}`;
      const addURL = newURL + `?book=${bookID}`;
      // console.log(addURL);
      console.log(bookID);
      const res = await Axios.post(addURL);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // Show Books
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

  // const counter = () => {
  //   num++;
  //   if (num > 2) {
  //     num = 0;
  //   }
  // };

  useEffect(() => {
    getBooks();
    addLoan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort, direction, pagination, num, bookID]);

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
            <div className="cardContainer">
              <Card className="cardCont">
                <a href={`/book/${item.id}`} key={index}>
                  <Card.Img
                    className="cardImg"
                    variant="top"
                    src={item.Images}
                  />
                  <Card.Body className="test">
                    <Card.Title className="cardTitle" content>{item.Title}</Card.Title>
                  </Card.Body>
                </a>
                <Button
                  variant="primary"
                  onClick={() => {
                    setBookID(item.id);
                  }}
                >
                  Add
                </Button>
              </Card>
            </div>
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
