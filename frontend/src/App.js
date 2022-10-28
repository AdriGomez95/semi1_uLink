import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/login";

import Information from './components/Information/Information'
import AddFriend from './components/AddFriend/AddFriend'
import FriendRequest from './components/FriendRequest/FriendRequest'
import Registrar from "./components/Registrar/register";
import Confirmar from "./components/Registrar/confirmarcorreo";
import Posts from './components/Posts/Posts'
import Messages from "./components/Messages/Messages"

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} exact />    
        <Route path="/informacion" element={<Information />} exact />    
        <Route path="/agregar_amigos" element={<AddFriend />} exact />   
        <Route path="/solicitudes" element={<FriendRequest />} exact /> 
        <Route path="/registrar" element={<div> <Registrar/></div> } exact />   
        <Route path="/confirmarcorreo/:id" element={<div> <Confirmar/></div> } exact />   
        <Route path="/publicaciones" element={<Posts />} exact />  
        <Route path="/mensajes" element={<Messages />} exact />  
          
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
