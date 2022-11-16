// Set Up
import { Route, Routes, BrowserRouter } from "react-router-dom";

// Components
import { Layout } from "./components/layout";

// Pages
import { RegisterPage } from "./pages/RegisterPage";
import { VerificationPage } from "./pages/VerificationPage";
import { HomePage } from "./pages/HomePage";

function App() {
  // const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  console.log(token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verification/:token" element={<VerificationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
