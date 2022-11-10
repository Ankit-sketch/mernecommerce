import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import AppBar from "./components/layout/Appbar/Appbar";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import Register from "./pages/Register";
function App() {
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
