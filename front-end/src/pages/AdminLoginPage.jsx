import axios from "axios";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { loginAdmin } from "../redux/adminSlice";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const url = "http://localhost:2000/admin/adminLogin";

export const AdminLoginPage = () => {
  const usernameEmail = useRef("");
  const password = useRef("");
  const [move, setMove] = useState(false);
  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      const admin = {
        password: password.current.value,
        data: usernameEmail.current.value,
      };

      console.log(admin);

      const result = await axios.post(url, admin);

      console.log(result.data);

      dispatch(loginAdmin(result.data.isAdminExist));
      localStorage.setItem("tokenAdmin", result.data.token);
      setMove(true);

      Swal.fire({
        icon: "success",
        tittle: "Sukses",
        text: "Login sebagai Admin berhasil",
      });
    } catch (err) {
      console.log(err);
      // Swal.fire({ icon: "error", title: "Error", text: err.response.data });
    }
  };

  // move ? (
  //   <Navigate to="#adminDashboard" replace={true} />
  // ) :

  return (
    <div className="container-login d-flex flex-column justify-content-center align-items-center">
      <Form.Group className="headerFront">
        <div className="header">
          <h1> Admin Login </h1>
        </div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>username/email</Form.Label>
        <Form.Control placeholder="username/email" ref={usernameEmail} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Password" ref={password} type="password" />
      </Form.Group>
      <div className="button">
        <Button variant="primary" type="submit" size="lg" onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};
