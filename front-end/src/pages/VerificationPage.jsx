import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Card from "react-bootstrap/Card";
import "../css/verification.css";
import Nav from "react-bootstrap/Nav";

const url = "http://localhost:2000/user/verification";

export const VerificationPage = () => {
  const [msg, setMsg] = useState();
  const [nim, setNim] = useState();
  const params = useParams();

  const verifyToken = async () => {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      });
      setMsg(res.data.msg);
      setNim(res.data.userNim);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Verifikasi",
        text: setMsg("Verifikasi Gagal"),
      });
    }
  };

  // const getUser = async ()

  useEffect(() => {
    verifyToken();
  });

  return (
    <div className="container-header d-flex flex-column justify-content-center align-items-center">
      <Card>
        <Card.Body>
          <h1>{msg}</h1>
          <br></br>
          <p>
            Nim anda adalah <strong>{nim}</strong>
          </p>
          <br></br>
          <Nav.Link href="/">Click here to go landing page</Nav.Link>
        </Card.Body>
      </Card>
    </div>
  );
};
