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
import { DetailPage } from "./pages/DetailPage";

// KeepLogin
import { useDispatch } from "react-redux";
import { login } from "./redux/userSlice";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  console.log(token);

  const keepLogin = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/user/keepLogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      dispatch(login(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    keepLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/book/:id" element={<DetailPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verification/:token" element={<VerificationPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
