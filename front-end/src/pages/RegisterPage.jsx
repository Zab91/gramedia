import { useState } from "react";
import axios from "axios";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import FormTB from "react-bootstrap/Form";
import "./register.css";

const urlRegister = "http://localhost:2000/user/register";

export const RegisterPage = () => {
  const [show, setShow] = useState(false);

  const registerSchema = Yup.object().shape({
    password: Yup.string().required().min(6, "Minimal password 6 karakter"),
    email: Yup.string()
      .email("Harus bertipe email ex:(asd@gmail.com)")
      .required("required"),
  });

  const onRegister = async (data) => {
    try {
      console.log(data);
      const result = await axios.post(urlRegister, data);
      console.log(result);
      Swal.fire({
        icon: "success",
        title: "Register",
        text: "Register Berhasil!",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.name
          ? // ? error.response.data.errors[0].message
            "Email sudah dipakai"
          : error.response.data,
      });
    }
  };

  return (
    <div className="register">
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(values, action) => {
          onRegister(values);
        }}
      >
        {(props) => {
          console.log(props);
          return (
            <Form>
              <FormTB.Group className="headerFront">
                <div className="header">
                  <h1> Daftar </h1>
                </div>
              </FormTB.Group>
              <FormTB.Group className="mb-3">
                <FormTB.Label>Email</FormTB.Label>
                <FormTB.Control
                  as={Field}
                  type="email"
                  placeholder="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red", width: "fixed" }}
                />
              </FormTB.Group>
              <FormTB.Group className="mb-3">
                <FormTB.Label>Username</FormTB.Label>
                <FormTB.Control
                  as={Field}
                  type="username"
                  placeholder="username"
                  name="username"
                />
              </FormTB.Group>
              <FormTB.Group className="mb-3">
                <FormTB.Label>Password</FormTB.Label>
                <FormTB.Control
                  as={Field}
                  type="password"
                  placeholder="Password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red" }}
                />
              </FormTB.Group>
              <FormTB.Group className="mb-3">
                <FormTB.Label>Confirm Password</FormTB.Label>
                <FormTB.Control
                  as={Field}
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  style={{ color: "red" }}
                />
              </FormTB.Group>
              <div className="button1">
                <Button variant="primary" type="submit" size="lg">
                  submit
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
