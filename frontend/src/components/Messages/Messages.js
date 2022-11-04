import React, { useEffect, useState, useRef } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
//import io from "socket.io-client";
import swal from 'sweetalert';
import { Grid, Text, Row, Input, Button } from "@nextui-org/react";
import { Form, Col } from 'react-bootstrap'

import Barra from "../Barra/Barra"
import {methodPOST,enviarMensaje} from "../../services/api";



/*
const ENDPOINT = "http://localhost:8080/";
const socket = io(ENDPOINT, {transports:['websocket']});
*/




function Messages ()  {
    
    const user = JSON.parse(localStorage.getItem('usuario'));

    let [cliente, setCliente] = useState([]) //Para USUARIO



    //---------------- TABLA DE MENSAJES ---------------------------
    let [datatable, setDatatable] = useState({})

    useEffect(() => {
        const columns = [
            {
                label: 'Usuario',
                field: 'author',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Usuario',
                },
            },
            {
                label: 'Mensaje',
                field: 'contents',
                width: 200,
            },
            {
                label: 'Fecha',
                field: 'date',
                width: 200,
            }
        ]

        let formdata = new FormData()
        let requestOptions = {
            method: 'GET',
            data: formdata,
            redirect: 'follow'
        }

        fetch(`https://cw7ed1p5b3.execute-api.us-east-1.amazonaws.com/prod/readMessages/`+ user.attributes['custom:susname'], requestOptions)
            .then(response => response.json())
            .then(result => setDatatable({ columns: columns, rows: result }))
            .catch(error => console.log('error', error))

            
        fetch(`https://cw7ed1p5b3.execute-api.us-east-1.amazonaws.com/prod/getFriends/`+ user.attributes['custom:susname'], requestOptions)
        .then(response => response.json())
        .then(result => setCliente(result))
        .catch(error => console.log('error', error))
            
    }, [])



    //---------------- DATOS A ENVIAR ---------------------------
    let usuario = useRef()
    let escrito = useRef()

    let enviarDatos = async () => {
        
        let nuevoU = usuario.current.value
        let nuevoE = escrito.current.value

        console.log("author: ", user.attributes['custom:susname'], " receiver: ",nuevoU, " contents: ",nuevoE)
        const sendMessage = await methodPOST(enviarMensaje,{"author": user.attributes['custom:susname'], "receiver":nuevoU, "contents":nuevoE})


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
        
        
    };











/*
    const mandar = () => {
        console.log('entro')
        socket.emit("probando", 'mensaje desde el cliente')
    }

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
            </Grid>


            <Grid>
                <Row>
                    <Col>
                        <Form.Label column lg={2}>
                            Mensaje
                        </Form.Label>  
                    </Col>
                    <Col>                 
                        <Form.Control type="text" placeholder="Escriba su mensaje" ref={escrito}  />
                    </Col>
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

  