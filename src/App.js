// import './App.css'
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Edit from "./components/Edit";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          {/* <Route path="/home" element={
        <ProtectedRoute>
        <Home/>
        </ProtectedRoute>
     }/> */}
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;