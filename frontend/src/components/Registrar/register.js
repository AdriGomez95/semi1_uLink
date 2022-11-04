import "./estilo.css";
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import swal from "sweetalert";

import { Auth } from "aws-amplify";
import { methodPOST, registrar } from "../../services/api";
import AWS from 'aws-sdk'
AWS.config.update({
  accessKeyId: 'AKIAS73YTZZYZGXS56UN',
  secretAccessKey: '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',
})

const S3_BUCKET ='archivos-grupo5-p1/seminario';


const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: 'us-east-1',
})

function Registrar() {
  let navigate = useNavigate();
  const [registrarte, setRegistrar] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    confirmPassword: "",
    imgurl:""
  });


  
  const log = async () => {
    console.log(registrarte);
    if (
      registrarte.username != "" &&
      registrarte.password != "" &&
      registrarte.email != "" &&
      registrarte.name != "" 
    ) {
      try {
        if (registrarte.password === registrarte.confirmPassword) {
          const register=  await Auth.signUp({
            username: registrarte.email,
            password: registrarte.password,
            attributes: {
              email:registrarte.email,
              'custom:nombre': registrarte.name,
              'custom:susname': registrarte.username,
            },
          });

        await methodPOST(registrar,{ "name":registrarte.name, "lastname":"", "username":registrarte.username, "email":registrarte.email, "password":registrarte.password, "imgurl": registrarte.imgurl})
        swal("Exito","Registrado Con exito!", "success");
        navigate("/");
      }else{
        swal("Error","Las contraseñas no coinciden", "error");
      }
      } catch (error) {
        console.error(error);
        swal("Error", error.message, "error");
      }
    } else {
      swal("Incomplete data", "Please fill in all the fields!", "error");
    }
  };

  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileInput = (e) => {
      uploadFile(e.target.files[0])
  }
  
  const uploadFile = (file) => {
    console.log(registrarte.imgurl)
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name
    };
    
      registrarte.imgurl=`https://archivos-grupo5-p1.s3.us-east-2.amazonaws.com/seminario/${file.name}`

    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log(err)
        })
}

  return (
    <div className="Auth-form-container" style={{ background: "gray" }}>
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Registrar</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => {
                registrarte.email = e.target.value;
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>username</label>
            <input
              className="form-control mt-1"
              placeholder="Enter username"
              onChange={(e) => {
                registrarte.username = e.target.value;
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              className="form-control mt-1"
              placeholder="Enter name"
              onChange={(e) => {
                registrarte.name = e.target.value;
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => {
                registrarte.password = e.target.value;
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => {
                registrarte.confirmPassword = e.target.value;
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Subir imagen</label>
            <input
                    class="form-control"
                    type="file"
                    accept="image/*"
                    name="avatar-file"
                    onChange={handleFileInput}
                  />
            {/* <img src={registrarte.imgurl} height={'100%'} width={'100%'}/> */}
          </div>
          <div className="d-grid gap-2 mt-3"></div>
        </div>
        <button className="btn btn-primary" onClick={() => log()}>
          Crear Usuario
        </button>{" "}
        <Link to="/">
          <button className="btn btn-primary" onClick={() => {}}>
            Regresar
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Registrar;