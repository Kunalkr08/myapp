import './App.css';
import Login from './pages/Login';
import Layout from './Layout';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Post from './pages/Post';
import Header from './pages/Header';
import {Routes, Route } from "react-router-dom";

function App() {
  return (
       <Routes>
           <Route index element={<Layout/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/signup" element={<Signup/>}/> 
           <Route path="/Home" element={<Home/>}/>
           <Route path="/profile" element={<Post/>}/>
           <Route path="/header" element={<Header/>}/>
       </Routes>
  )
}

export default App;
