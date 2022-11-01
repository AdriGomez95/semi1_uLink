import React, { useEffect, useState } from 'react'

import swal from 'sweetalert';

import { Grid, Card, Text, Row, Col, Input, Button } from "@nextui-org/react";

import AWS from 'aws-sdk';
import Barra from "../Barra/Barra";
import foto from './fotoPerfil.jpg'
import { useLocation } from 'react-router-dom';

AWS.config.apiVersions = {
    translate: '2017-07-01',
  }

  var translate = new AWS.Translate();
AWS.config.update({
    accessKeyId: 'AKIAS73YTZZYZGXS56UN',
    secretAccessKey: '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',
    region: 'us-east-1',
})


var params = {
    SourceLanguageCode: 'auto',
    TargetLanguageCode: 'es',
    Text: 'Hello! My name is Fernando.'
  };
function Information ()  {
    const user = JSON.parse(localStorage.getItem('usuario'));
    console.log(user)
    const [datosNuevos, setDatosNuevos] = useState({
        name: "",      
        lastname: "",  
        username: "", 
        imgurl: "",  
        bot: "",  
        actualusername: "",   
        Pass: "",    
        Confpass: ""  
    });

    const CambiarDatos = async () => {
        let myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        //let a = JSON.stringify(datosNuevos)
        //console.log(a)
        // console.log(datosNuevos)
        translate.translateText(params, function (err, data) {
            if (err) console.log(err, err.stack); 
            else     console.log(data['TranslatedText']);
          });

        // let requesOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: datosNuevos,
        //     redirect: 'follow'
        // }

        // fetch("http://localhost:9000/actualizar_datos", requesOptions)
        //     .then(response => response.text())
        //     .then(result => {
        //         console.log(result)

        //         swal({
        //             title:"Correcto",
        //             text: "Sus datos han sido actualizados",
        //             icon: "success",
        //             timer: 2000,
        //         });
        //     })
        //     .catch(error => console.log('error', error))

    };



  

      useEffect(() => {
        CambiarDatos()
        }, [])
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
                        onChange={(e) => {datosNuevos.name=e.target.value}}
                    />
                </Row>
                <br></br><br></br>


                <Row>
                    <Input
                        bordered
                        labelPlaceholder="Apellido" color="primary"
                        id="Apellido" name="Apellido"
                        onChange={(e) => {datosNuevos.lastname=e.target.value}}
                    />
                </Row>
                <br></br><br></br>


                <Row>
                    <Input
                        bordered
                        labelPlaceholder="Usuario" color="primary"
                        id="Usuario" name="Usuario"
                        onChange={(e) => {datosNuevos.username=e.target.value}}
                    />
                </Row>
                <br></br><br></br>


                <Row>
                    <Input
                        bordered
                        labelPlaceholder="Imagen" color="primary"
                        id="Imagen" name="Imagen"
                        onChange={(e) => {datosNuevos.imgurl=e.target.value}}
                    />
                </Row>
                <br></br><br></br>


                <Row>
                    <Input
                        bordered
                        labelPlaceholder="Usuario actual" color="primary"
                        id="UsuarioActual" name="Usuario actual"
                        onChange={(e) => {datosNuevos.actualusername=e.target.value}}
                    />
                </Row>
                <br></br><br></br>

                <Row>
                    <Input
                        bordered
                        labelPlaceholder="Modo boot" color="primary"
                        id="Boot" name="Boot"
                        onChange={(e) => {datosNuevos.bot=e.target.value}}
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

  