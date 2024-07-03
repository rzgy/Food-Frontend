import {
  NavLink,
  Route,
  Routes,
  useActionData,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Onboard from "./pages/Onboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import Recepie from "./pages/Recepie";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import UserContext from "./context/userContext";

function App() {
  const [user, setUser] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(true);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        {/* <Navbar /> */}
        {location.pathname !== "/" && <Navbar />}
        <Routes>
          <Route path="/" element={<Onboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category" element={<Category />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recepie" element={<Recepie />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
