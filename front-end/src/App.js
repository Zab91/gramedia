import { RegisterPage } from "./pages/RegisterPage";
import { VerificationPage } from "./pages/VerificationPage";
import { Homepage } from "./pages/landingPage";
// import { useDispatch } from "react-redux";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  // const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  console.log(token);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verification/:token" element={<VerificationPage />} />
      </Routes>
    </div>
  );
}

export default App;
