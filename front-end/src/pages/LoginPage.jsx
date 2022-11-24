import axios from "axios";
import { Navigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import FormTB from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { login } from "../redux/userSlice";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import "../css/login.css";

const url = "http://localhost:2000/user/login";

export const LoginPage = () => {
  const nim = useRef("");
  const password = useRef("");
  const dispatch = useDispatch();
  const [move, setMove] = useState(false);
  console.log(move);

  const onLogin = async () => {
    try {
      const user = {
        password: password.current.value,
        NIM: nim.current.value,
      };

      console.log(user);
      const result = await axios.post(url, user);
      console.log(result);

      dispatch(login(result.data.user));
      localStorage.setItem("token", result.data.token);
      setMove(true);
      Swal.fire({
        icon: "success",
        tittle: "Sukses",
        text: "Login Berhasil",
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data,
      });
    }
  };

  return move ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>
      <a href="/">
        <img
          src="https://www.poultryindonesia.com/wp-content/uploads/2018/10/Gramedia-logo.png"
          width="auto"
          height="65px"
          alt="logo"
        />
      </a>
      <FormTB.Group className="headerFront">
        <div className="header">
          <h1> Login </h1>
        </div>
      </FormTB.Group>
      <div className="container-Button d-flex flex-center justify-content-center align-item-center">
        <Card>
          <Card.Body>
            <FormTB.Group className="mb-3">
              <FormTB.Label>NIM</FormTB.Label>
              <FormTB.Control placeholder="NIM" ref={nim} />
            </FormTB.Group>
            <FormTB.Group className="mb-3">
              <FormTB.Label>Password</FormTB.Label>
              <FormTB.Control
                placeholder="Password"
                ref={password}
                type="password"
              />
            </FormTB.Group>
            <div className="button">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                onClick={onLogin}
              >
                Login
              </Button>
            </div>
            <div className="container-link  d-flex flex-column justify-content-center align-items-center">
              <Nav.Link href="/register">Don't have account ?</Nav.Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
