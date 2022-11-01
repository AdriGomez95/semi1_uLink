import React, { useState, useEffect } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import io from "socket.io-client";
import swal from 'sweetalert';
import { Grid, Card, Text, Row, Col, Input, Button } from "@nextui-org/react";

import Barra from "../Barra/Barra"




const ENDPOINT = "http://localhost:9000/";
const socket = io(ENDPOINT, {transports:['websocket']});





function Messages ()  {
    
    let [datatable, setDatatable] = useState({})


    useEffect(() => {
        const columns = [
            {
                label: 'Usuario',
                field: 'usuario',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Usuario',
                },
            },
            {
                label: 'Mensaje',
                field: 'mensaje',
                width: 200,
            },
            {
                label: 'Fecha',
                field: 'fecha',
                width: 200,
            }
        ]

        let formdata = new FormData()
        let requestOptions = {
            method: 'GET',
            data: formdata,
            redirect: 'follow'
        }

        fetch("http://localhost:9000/mensajitos", requestOptions)
            .then(response => response.json())
            .then(result => setDatatable({ columns: columns, rows: result }))
            .catch(error => console.log('error', error))

    }, [])



    //---------------- DATOS A ENVIAR ---------------------------
    const [datosMensaje, setDatosMensaje] = useState({   
        Usuario: "",  
        Mensaje: "" 
    });



    let enviarDatos = async () => {
        let myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        console.log(datosMensaje)
        
        var a = JSON.stringify({
            "mensaje": datosMensaje
        });

        
        let requesOptions = {
            method: 'POST',
            headers: myHeaders,
            body: a,
            redirect: 'follow'
        }

        fetch("http://localhost:9000/crear_mensaje", requesOptions)
            .then(response => response.text())
            .then(result =>console.log(result))
            .catch(error => console.log('error', error))
        
    };





    //let socket = io('/localhost:9000/connection')
    
    //const ENDPOINT = "http://localhost:9000/connection";
    //const socket = io(ENDPOINT, {transports:['websocket']});
    const mandar = () => {
        console.log('entro')
        socket.emit("probando", 'mensaje desde el cliente')

    }







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
                    <Button auto ghost color="gradient" onPress={() => mandar()} >
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

  