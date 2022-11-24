import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const url = "http://localhost:2000/user/verification";

export const VerificationPage = () => {
  const [msg, setMsg] = useState("Loading...");
  const params = useParams();

  const verifyToken = async () => {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      });
      Swal.fire({
        icon: "success",
        tittle: "Verifikasi",
        text: setMsg(res.data),
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Verifikasi",
        text: setMsg("Verifikasi Gagal"),
      });
    }
  };

  useEffect(() => {
    verifyToken();
  });

  return (
    <div>
      <h1>Verifikasi Akun Anda</h1>
      <br></br>
      <p>{msg}</p>
      <br></br>
      <strong>Nim anda adalah {}</strong>
    </div>
  );
};
