import React, { useState } from 'react'

import swal from 'sweetalert';

import { Grid, Card, Text, Row, Col, Input, Button } from "@nextui-org/react";


import Barra from "../Barra/Barra";
import foto from './fotoPerfil.jpg'




function Information ()  {
    const [datosNuevos, seDatos] = useState({
        Nombre: "",      
        Usuario: "",  
        Boot: "",   
        Pass: "",    
        Confpass: ""  
    });

    const CambiarDatos = async () => {
        let myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        //let a = JSON.stringify(datosNuevos)
        //console.log(a)
        console.log(datosNuevos)
        
        let requesOptions = {
            method: 'POST',
            headers: myHeaders,
            body: datosNuevos,
            redirect: 'follow'
        }

        fetch("http://localhost:9000/actualizar_datos", requesOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)

                swal({
                    title:"Correcto",
                    text: "Sus datos han sido actualizados",
                    icon: "success",
                    timer: 2000,
                });
            })
            .catch(error => console.log('error', error))

    };





    return (
      <div>
        <Barra/>
        <br></br>



        <Text h1 size={60} css={{ textGradient: "45deg, $blue400 -20%, $cyan600 50%", }} weight="bold">
            Bienvenido
        </Text>



        <Grid.Container gap={3} justify="center">

            {/* AQUI SE MUESTRAN LOS DATOS DEL USUARIO */}
            <Grid>
                <Card css={{ $$cardColor: '$colors$gradient' }}>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Text color="white" css={{ m: 0 }}>
                                    Nombre:
                                </Text>
                            </Col>
                            <Col>
                                <Text color="black" css={{ m: 0 }}>
                                    aqui un nombre
                                </Text>
                            </Col>
                        </Row>


                        <Row>
                            <Col>
                                <Text color="white" css={{ m: 0 }}>
                                    Usuario:
                                </Text>
                            </Col>
                            <Col>
                                <Text color="black" css={{ m: 0 }}>
                                    aqui un usuario
                                </Text>
                            </Col>
                        </Row>

                        
                        <Row>
                            <Col>
                                <Text color="white" css={{ m: 0 }}>
                                    Modo Bot:
                                </Text>
                            </Col>
                            <Col>
                                <Text color="black" css={{ m: 0 }}>
                                    aqui el estado
                                </Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Grid>





            
            {/* AQUI LA IMAGEN DEL PERFIL */}
            <Grid > 
                <Card>
                    <Card.Image
                    src={foto}
                    objectFit="cover"
                    width="100%"
                    height={340}
                    alt="Card image background"
                    />
                </Card>
            </Grid>





            
            {/* AQUI SE CAMBIAN LOS DATOS DEL USUARIO */}
            <Grid>
                <Row>
                    <Input
                        bordered
                        labelPlaceholder="Nombre" color="primary"
                        id="Nombre" name="Nombre"
                        onChange={(e) => {datosNuevos.Nombre=e.target.value}}
                    />
                </Row>
                <br></br><br></br>


                <Row>
                    <Input
                        bordered
                        labelPlaceholder="Usuario" color="primary"
                        id="Usuario" name="Usuario"
                        onChange={(e) => {datosNuevos.Usuario=e.target.value}}
                    />
                </Row>
                <br></br><br></br>

                <Row>
                    <Input
                        bordered
                        labelPlaceholder="Modo boot" color="primary"
                        id="Boot" name="Boot"
                        onChange={(e) => {datosNuevos.Boot=e.target.value}}
                    />
                </Row>
                <br></br><br></br>

                <Row>
                    <Input
                        bordered
                        id="filled-adornment-password"
                        type='password'
                        color="primary" labelPlaceholder="Contraseña"
                        onChange={(e) => {datosNuevos.Pass=e.target.value}}
                    />
                </Row>
                <br></br><br></br>


                <Row>
                    <Input
                        bordered
                        id="filled-adornment-password2"
                        type='password'
                        color="primary" labelPlaceholder="Confirmar contraseña"
                        onChange={(e) => {datosNuevos.Confpass=e.target.value}}
                    />
                </Row>    
                <br></br>


                <Row>
                    <Button auto ghost color="primary" onClick={() => CambiarDatos()} >
                        Modificar datos
                    </Button>
                </Row>            
            </Grid>
        </Grid.Container>


        <br></br><br></br><br></br><br></br>
      </div>
    );
  };
  
  export default Information;

  