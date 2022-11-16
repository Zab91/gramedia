import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
      setMsg(res.data);
    } catch (err) {
      console.log(err);
      setMsg("Verifikasi Gagal");
    }
  };

  useEffect(() => {
    verifyToken();
  });

  return (
    <div>
      <h1>Verifikasi Akun Anda</h1>
      <h3>{msg}</h3>
    </div>
  );
};
