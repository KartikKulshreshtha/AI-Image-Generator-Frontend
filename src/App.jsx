import { useState } from "react";
import "./index.css";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Logo from "../src/assets/Logo.png";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [token, setToken] = useState("")
  return (
    <>
    {
      token ? (
        <BrowserRouter>
        <Routes>
          <header
            className="w-full flex justify-between items-center sm:px-8 px-4 py-1 border-b border-b-[#e6ebf4] bg-[#000061]"
            style={{ backgroundColor: "rgb(0 0 97) !important" }}
          >
            <Link to="/">
              <img
                src={Logo}
                alt=""
                style={{
                  border: "4.2px solid white",
                  borderRadius: "50%",
                  padding: "7px",
                  width: "56%",
                }}
              />
            </Link>
            <Link
              to="/create"
              className="font-inter font-large bg-[#0284c7] text-white px-4 py-2 rounded-md"
            >
              Create
            </Link>
          </header>
          <main className="sm:p-8 px-4 py-8 w-full bg-[#e5e5e5] min-h-[calc(100vh-101.31px)]">
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
          </main>
        </Routes>
      </BrowserRouter>
      )
      : 
      (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
        </BrowserRouter>
      )
    }
    </>
  );
}

export default App;
