import "./estilo.css";
import { Link, useNavigate,useParams } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";
import Amplify from "aws-amplify";
import { Auth } from "aws-amplify";
import { methodPOST, registrar } from "../../services/api";


Amplify.configure({
  aws_project_region: 'us-east-1',
  region: 'us-east-1',
  identityPoolRegion: 'us-east-1',
  userPoolId: 'us-east-1_HjfRMnfJq',
  userPoolWebClientId: '5p35dsn9vvefr9k8r4fc0qhr09',
});


function Confirmar() {
const {id} = useParams()
console.log(id)
  let navigate = useNavigate();
  const [registrarte, setRegistrar] = useState({
    email: "",
  });
  const log = async () => {
    // console.log(registrarte);
    if (
      registrarte.email != "" 
    ) {
      try {
        await Auth.confirmSignUp(registrarte.email, id)
        swal("Exito","Registrado correo confirmado", "success");
        navigate("/");
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
          <h3 className="Auth-form-title">Confirma Email </h3>
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
          <div className="d-grid gap-2 mt-3"></div>
        </div>
        <button className="btn btn-primary" onClick={() => log()}>
          Confirm
        </button>{" "}
      </div>
    </div>
  );
}
export default Confirmar;