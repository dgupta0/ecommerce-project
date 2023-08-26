// import { useState } from 'react';
import Register from "./components/Register"
import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import Header from "./components/Header";
import Login from "./components/Login"
import LoginContext from "./context/LoginContext";
import { useState } from "react";

import Products from "./components/Products";
import Edit from "./components/Edit";
import Create from "./components/Create";




function App() {
  const [isLoggedIn, setIsLogged] = useState(false);

  return (
    <>
      <LoginContext.Provider value={{ isLoggedIn, setIsLogged }}>
        <BrowserRouter>
          <Header />
          <Routes>
            < Route path="/" element={<Register />} />
            < Route path="/login" element={<Login />} />
            < Route path="/products" element={<Products />} />
            < Route path="/create" element={<Create />} />
            < Route path="/edit" element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </>
  )
}

export default App
