// import { useState } from 'react';
import Register from "./components/Register"
import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import Header from "./components/Header";
import Login from "./components/Login"
import LoginContext from "./context/LoginContext";
import { useState, useEffect } from "react";


function App() {
  const [isLoggedIn, setIsLogged] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [])
  return (
    <>
      <LoginContext.Provider value={{ isLoggedIn, setIsLogged }}>
        <BrowserRouter>
          <Header />
          <Routes>
            < Route path="/" element={<Register />} />
            < Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </>
  )
}

export default App
