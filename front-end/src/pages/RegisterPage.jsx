import axios from "axios";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import FormTB from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "../css/register.css";

const urlRegister = "http://localhost:2000/user/register";

export const RegisterPage = () => {
  const [move, setMove] = useState(false);
  const registerSchema = Yup.object().shape({
    password: Yup.string().required().min(6, "6 Character required"),
    email: Yup.string()
      .email("must be email ex:(asd@gmail.com)")
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
        text: "Register Success! please check your email",
      });
      setMove(true);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.name
          ? error.response.data.errors[0].message
          : error.response.data,
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
                    <h1> Register </h1>
                  </div>
                </FormTB.Group>
                <Card>
                  <Card.Body>
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
                  </Card.Body>
                </Card>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};
