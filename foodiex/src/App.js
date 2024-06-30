import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import Recepie from "./pages/Recepie";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/category" Component={Category} />
        <Route path="/profile" Component={Profile} />
        <Route path="/recepie" Component={Recepie} />
      </Routes>
    </div>
  );
}

export default App;
