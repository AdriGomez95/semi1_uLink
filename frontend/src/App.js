import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/login";

import Information from './components/Information/Information'
import AddFriend from './components/AddFriend/AddFriend'
import FriendRequest from './components/FriendRequest/FriendRequest'
import Registrar from "./components/Registrar/register";
import Confirmar from "./components/Registrar/confirmarcorreo";
import Posts from './components/Posts/Posts'
import CreatePost from './components/Posts/CreatePost'
import Messages from "./components/Messages/Messages"
import Amplify from "aws-amplify";
import AWS from 'aws-sdk';
// const S3_BUCKET ='YOUR_BUCKET_NAME_HERE';
// const REGION ='YOUR_DESIRED_REGION_HERE';


AWS.config.update({
  accessKeyId: 'AKIAS73YTZZYZGXS56UN',
  secretAccessKey: 'RFSBvcymuM3DiQKWVwdOJ4WJQfIdHmXYLR8nG+0x',
  region: 'us-east-1',
})
// const myBucket = new AWS.S3({
//     params: { Bucket: S3_BUCKET},
//     region: REGION,
// })

Amplify.configure({
  aws_project_region: 'us-east-1',
  region: 'us-east-1',
  identityPoolRegion: 'us-east-1',
  userPoolId: 'us-east-1_HjfRMnfJq',
  userPoolWebClientId: '5p35dsn9vvefr9k8r4fc0qhr09',
});

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
        <Route path="/hacer_publicacion" element={<CreatePost />} exact />  
        <Route path="/mensajes" element={<Messages />} exact />  
          
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
