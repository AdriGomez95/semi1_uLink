import "./estilo.css";
import { Link ,useNavigate  } from "react-router-dom";
import { useState } from "react";
import swal from 'sweetalert';
import { Auth } from "aws-amplify";


function Login() {
  let navigate = useNavigate();
  const [logearte, setLogin] = useState({
    username: "",
    password: "",
  });
  const log = async () => {
    // console.log(registrarte);
    if (
      logearte.username != "" &&
      logearte.password != ""
    ) {
      try {
        await Auth.signIn( logearte.username, logearte.password)
        swal("Exito","Login Exitoso", "success");
        navigate("/informacion");
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
