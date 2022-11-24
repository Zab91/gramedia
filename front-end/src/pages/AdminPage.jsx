import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import Nav from "react-bootstrap/Nav";

//Pop Over untuk Edit masih bingung cara dia bisa ngikut apa loopingan table

// CSS
import "../css/style.css";
import { logoutAdmin } from "../redux/adminSlice";

export const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState();
  const [sort, setSort] = useState();
  const [direction, setDirection] = useState();
  const [pagination, setPagination] = useState(0);
  const [page, setPage] = useState(1);
  const [num, setNum] = useState(0);
  const [bookId, setbookId] = useState();
  const [edit, setEdit] = useState({});

  //edit data buku
  const title = useRef("");
  const publisher = useRef("");
  const author = useRef("");
  const categoryEdit = useRef("");
  const year = useRef("");

  //admin keep login/logout
  const { username } = useSelector((state) => state.adminSlice.value);
  console.log(username);
  const dispatch = useDispatch();

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
      console.log(bookId);

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

  //admin Logout
  const onLogoutAdmin = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenAdmin");
  };

  // const pageCounter = () => {
  //   if (page > 0) {
  //     setPage(page + 1)
  //   }
  // }

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort, direction, pagination, num, bookId]);

  // const counter = () => {
  //   num++;
  //   if (num > 2) {
  //     num = 0;
  //   }
  // };

  //tombol edit buku
  const urlEdit = `http://localhost:2000/book/edit/${bookId}`;

  const editBook = async () => {
    try {
      const editData = {
        title: title.current.value,
        publisher: publisher.current.value,
        author: author.current.value,
        categoryEdit: categoryEdit.current.value,
        year: year.current.value,
      };

      // console.log(books);
      const resultEdit = Axios.patch(urlEdit, editData);
      console.log(resultEdit);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Edited",
        text: "Succesfuly Edited",
        timer: 10000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Pop overlay edit buku
  const popOver = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Edit Buku</Popover.Header>
      <Popover.Body>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control defaultValue={edit?.title} ref={title} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Publisher</Form.Label>
          <Form.Control defaultValue={edit?.publisher} ref={publisher} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>author</Form.Label>
          <Form.Control defaultValue={edit?.author} ref={author} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Category</Form.Label>
          <Form.Control defaultValue={edit?.category} ref={categoryEdit} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Year</Form.Label>
          <Form.Control defaultValue={edit?.year} ref={year} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={editBook}>
          Confirm Edit
        </Button>
      </Popover.Body>
    </Popover>
  );

  //delete buku
  console.log(bookId);
  const urlDelete = `http://localhost:2000/book/delete/${bookId}`;
  const bookDelete = async () => {
    try {
      const delBook = await Axios.delete(urlDelete);
      console.log(delBook);
      Swal.fire({
        position: "top-end",
        icon: "success",
        text: "Delete Berhasil",
        timer: 1000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Pop overlay Delete buku
  const popOverDel = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Are you sure?</Popover.Header>
      <Popover.Body>
        <Form.Group className="mb-2">
          <Button variant="danger" onClick={bookDelete}>
            Yes
          </Button>
        </Form.Group>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/admin">Home</Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="me-auto">
            <Nav.Link href="/createBook">Create Book</Nav.Link>
          </Nav>
          <div className="d-flex flex-row justify-content-space-between ">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Avatar.jpg"
              width="30px"
              height="30px"
            />
          </div>
          <NavDropdown title={username} id="basic-nav-dropdown">
            <NavDropdown.Item
              as={Link}
              to="/adminLogin"
              onClick={onLogoutAdmin}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>

      <div className="container-table">
        <div className="container-FilterButton d-flex flex-row justify-content-space-between">
          <DropdownButton id="dropdown-item-button" title="Filter Book">
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

          <DropdownButton id="dropdown-item-button" title="Sort">
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

        <div className="containerDataTable d-flex justify-content-center align-item-center">
          <Table striped bordered hover variant="dark" size="lg">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Category</th>
                <th>Year</th>
              </tr>
            </thead>
            {books.map((item, index) => {
              return (
                <>
                  <tbody>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.author}</td>
                      <td>{item.publisher}</td>
                      <td>{item.category}</td>
                      <td>{item.year}</td>
                      <td>
                        <div className="d-flex flex-row justify-content-center align-items-center">
                          <OverlayTrigger
                            trigger="focus"
                            placement="right"
                            overlay={popOver}
                          >
                            <Button
                              variant="success"
                              onClick={() => {
                                setbookId(item.id);
                                setEdit(item);
                              }}
                            >
                              Edit Buku
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-row justify-content-center align-items-center">
                          <OverlayTrigger
                            trigger="focus"
                            placement="right"
                            overlay={popOverDel}
                          >
                            <Button
                              variant="danger"
                              onClick={() => {
                                setbookId(item.id);
                              }}
                            >
                              Delete Book
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </Table>
        </div>
        <div className="containerButton d-flex flex-row justify-content-center align-item-center ">
          {books.length === 10 ? (
            <Button
              variant="primary"
              onClick={() => {
                setPagination(pagination + 8);
                setPage(page + 1);
              }}
            >
              Next
            </Button>
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
            <Button
              variant="primary"
              onClick={() => {
                setPagination(pagination - 8);
                setPage(page - 1);
              }}
            >
              Previous
            </Button>
          ) : (
            <Button variant="primary" disabled>
              Previous
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
