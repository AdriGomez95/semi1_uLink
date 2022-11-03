import React, { useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
//import io from "socket.io-client";
import swal from 'sweetalert';
import { Grid, Text, Row, Input, Button } from "@nextui-org/react";
//import { Form, Col } from 'react-bootstrap'

import Barra from "../Barra/Barra"
import {methodPOST,enviarMensaje} from "../../services/api";



/*
const ENDPOINT = "http://localhost:8080/";
const socket = io(ENDPOINT, {transports:['websocket']});
*/




function Messages ()  {
    
    const user = JSON.parse(localStorage.getItem('usuario'));

    //let [cliente, setCliente] = useState([]) //Para USUARIO



    //---------------- TABLA DE MENSAJES ---------------------------
    let [datatable, setDatatable] = useState({})

    useEffect(() => {
        const columns = [
            {
                label: 'Usuario',
                field: 'username',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Usuario',
                },
            },
            {
                label: 'Mensaje',
                field: 'message',
                width: 200,
            }
        ]

        let formdata = new FormData()
        let requestOptions = {
            method: 'GET',
            data: formdata,
            redirect: 'follow'
        }

        fetch(`http://localhost:8080/mensajitos/`+ user.attributes['custom:susname'], requestOptions)
            .then(response => response.json())
            .then(result => setDatatable({ columns: columns, rows: result }))
            .catch(error => console.log('error', error))

            /*
        fetch(`http://localhost:8080/getFriends/`+ user.attributes['custom:susname'], requestOptions)
        .then(response => response.json())
        .then(result => {
            let arreglorespuesta = []
            result.forEach((element) => {
                arreglorespuesta.push(element.username)
            })
            setCliente(arreglorespuesta)
        })
        .catch(error => console.log('error', error))
            */
    }, [])



    //---------------- DATOS A ENVIAR ---------------------------
    const [datosMensaje, setDatosMensaje] = useState({   
        Usuario: "",  
        Mensaje: "" 
    });

    //let usuario = useRef()

    let enviarDatos = async () => {
        
        const sendMessage = await methodPOST(enviarMensaje,{ "user":datosMensaje.Usuario, "message":datosMensaje.Mensaje})


        if(sendMessage){
            swal({
                title:"Enviado",
                text: "Mensaje enviado correctamente",
                icon: "success",
                timer: 1000,
            });
        }else{
            swal({
                title:"Error",
                text: "No se envio el mensaje, intente de nuevo",
                icon: "Error",
                timer: 1000,
            });
        }
        
        //socket.emit("probando", 'mensaje desde el cliente')
        
    };











/*
    const mandar = () => {
        console.log('entro')
        socket.emit("probando", 'mensaje desde el cliente')
    }

    
        <Row>
                <Col>
                    <Form.Label  >
                        Usuario
                    </Form.Label>
                </Col>
                <Col>
                    <Form.Group controlId="formGridState">
                        <Form.Select defaultValue="Choose..." ref={usuario} >
                            {
                                cliente.map((option, index) => {
                                    return (<option key={index} value={option}>{option}</option>)
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
        </Row>
*/






    return (
      <div>
        <Barra/>
        <br></br>



        <Text h1 size={60} css={{ textGradient: "45deg, $blue400 -20%, $cyan600 50%", }} weight="bold">
            Mensajeria
        </Text>
        <br/><br/>


        <Grid.Container gap={3} justify="center">
            <Grid>
                <Row>
                    <Input
                        bordered
                        labelPlaceholder="Usuario" color="primary"
                        id="Usuario" name="Usuario"
                        onChange={(e) => {datosMensaje.Usuario=e.target.value}}
                    />
                </Row>
            </Grid>


            <Grid>
                <Row>
                    <Input
                        bordered
                        labelPlaceholder="Mensaje" color="primary"
                        id="Mensaje" name="Mensaje"
                        onChange={(e) => {datosMensaje.Mensaje=e.target.value}}
                    
                    />
                </Row>
            </Grid>


            <Grid>
                <Row>
                    <Button auto ghost color="gradient" onPress={() => enviarDatos()} >
                        Enviar mensaje
                    </Button>
                </Row>            
            </Grid>
        </Grid.Container>




        <br/><br/>
        <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} searchTop searchBottom={false} />;
        

        <br></br><br></br><br></br><br></br>
      </div>
    );
  };
  
  export default Messages;

  