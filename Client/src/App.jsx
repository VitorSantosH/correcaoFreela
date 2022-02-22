import React, { useState } from "react";
import { UserForm } from "./components/UserForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Dahboard from "./components/Dashboard";
import Teste from "./components/TesteImg";

const App = () => {
  const [token, setToken] = useState();
  // console.log(token);
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/card-app" element={<UserForm />} />
          </Routes>
          <Routes>
            <Route path="/card-app/:id" element={<UserForm />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
          </Routes>
          {/* { token === "admin@gmail.com" && */}
          <Routes>
            <Route path="/dashboard" element={<Dahboard />} />
          </Routes>
          <Routes>
              <Route path="/teste" element={<Teste/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
