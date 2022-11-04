const URL = "http://localhost:8080";


export const login = "login";
export const registrar = "signup";
export const users="users";
export const subirArchivos="addfile";
export const editarArchivo="editfile";
export const eliminarArchivo="deletefile";
export const infoUsuario="userinfo";
export const enviarSolicitud = "request";
export const aceptarSolicitud = "answer";
export const enviarMensaje = "sendMessage";
export const updateInfoUser = "update";
export const crearPost = "createPost";


export const methodPOST = (peticion, data) => {
  return fetch(`${URL}/${peticion}`, {
    method: "POST",
    headers: { "Content-Type": "application/json","Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true  },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    });
};

export const methodDELETE = (peticion, data) => {
  return fetch(`${URL}/${peticion}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json","Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true  },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    });
};

 
export const methodGET = (peticion, data) => {
  return fetch(`${URL}/${peticion}`, {
    method: "GET",
    headers: { "Content-Type": "application/json","Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true  },
    
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};


export const methodPUT = (peticion, data) => {
  return fetch(`${URL}/${peticion}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json","Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true  },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    });
};
