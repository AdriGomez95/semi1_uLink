import "./estilo.css";
import { Link ,useNavigate  } from "react-router-dom";
import { useState } from "react";
import swal from 'sweetalert';

import { methodPOST, login } from "../../services/api";
function Login() {
  let navigate = useNavigate();
  const [logearte, setLogin] = useState({
    username: "",
    password: "",
  });
  const log = async () => {
    const respuesta = await methodPOST(login, logearte);
    if (respuesta.length > 0) {
      swal({
        title:"Welcome",
        text: "You are logged in",
        icon: "success",
        timer: 1000,
      });
      navigate("/dashboard", { state: respuesta });
    }else{
      swal("Credentials wrong", "wrong username or password!", "error");
    }
  };

  return (
    <div className="Auth-form-container" style={{ background: "gray" }}>
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => {logearte.username=e.target.value}}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => {logearte.password=e.target.value}}
            />
          </div>
          <div className="d-grid gap-2 mt-3"></div>
          <Link to="/registrar" >
          <p className="forgot-password text-right mt-2">
           Register
          </p>
          </Link>
        </div>
        <button className="btn btn-primary" onClick={() => log()}>
          Submit
        </button>
      </div>
    </div>
  );
}
export default Login;
