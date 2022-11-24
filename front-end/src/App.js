// Set Up
import { Route, Routes, BrowserRouter } from "react-router-dom";

// Components
import { Layout } from "./components/layout";

// Pages
import { RegisterPage } from "./pages/RegisterPage";
import { VerificationPage } from "./pages/VerificationPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { DetailPage } from "./pages/DetailPage";
import { CreateBook } from "./pages/AdminCreateBookPage";
import { TransactionPage } from "./pages/TransactionPage";


// KeepLogin
import { useDispatch } from "react-redux";
import { login } from "./redux/userSlice";
import { loginAdmin } from "./redux/adminSlice";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  // console.log(tokenAdmin);
  // console.log(token);

  const keepLogin = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/user/keepLogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data);
      dispatch(login(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const keepLoginAdmin = async () => {
    try {
      const res = await axios.get(
        `http://localhost:2000/admin/adminKeepLogin`,
        {
          headers: {
            Authorization: `Bearer ${tokenAdmin}`,
          },
        }
      );
      console.log(res.data);
      dispatch(loginAdmin(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    tokenAdmin
      ? keepLoginAdmin()
      : token
      ? keepLogin()
      : console.log("console log");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/book/:id" element={<DetailPage />} />
          <Route path="/verification/:token" element={<VerificationPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminLogin" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/createBook" element={<CreateBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
