import "./estilo.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";

import { Auth } from "aws-amplify";
import { methodPOST, registrar } from "../../services/api";





function Registrar() {
  let navigate = useNavigate();
  const [registrarte, setRegistrar] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    confirmPassword: "",
  });
  const log = async () => {
    // console.log(registrarte);
    if (
      registrarte.username != "" &&
      registrarte.password != "" &&
      registrarte.email != "" &&
      registrarte.name != "" 
    ) {
      try {
        if (registrarte.password === registrarte.confirmPassword) {
        await Auth.signUp({
          username: registrarte.email,
          password: registrarte.password,
          attributes: {
            email:registrar.email,
            'custom:nombre': registrarte.name,
            'custom:susname': registrarte.username,
          },
        });
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