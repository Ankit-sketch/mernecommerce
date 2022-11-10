import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Appbar";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./pages/loginSignup";
import Account from "./pages/Account.js";
import Store from "./store";
import { loadUser } from "./actions/userAction";
function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="account" element={<Account />} />
        <Route path="login" element={<Login />} />
        <Route path="account" element={<Account />} />
        <Route path="product/:id" element={<Account />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
