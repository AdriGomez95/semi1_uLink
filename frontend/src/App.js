import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/login";

import Information from './components/Information/Information'
import AddFriend from './components/AddFriend/AddFriend'
import FriendRequest from './components/FriendRequest/FriendRequest'


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} exact />    
        <Route path="/informacion" element={<Information />} exact />    
        <Route path="/agregar_amigos" element={<AddFriend />} exact />   
        <Route path="/solicitudes" element={<FriendRequest />} exact />    
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
