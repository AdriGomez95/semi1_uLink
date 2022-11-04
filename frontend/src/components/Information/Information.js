import React, { useEffect, useState } from 'react'

import swal from 'sweetalert';

import { Auth } from "aws-amplify";
import { Grid, Card, Text, Row, Col, Input, Button } from "@nextui-org/react";
import {methodPOST,infoUsuario,updateInfoUser,methodPUT} from "../../services/api";
import Barra from "../Barra/Barra";
import foto from './fotoPerfil.jpg'
import ChatBot from '../modals/modalChatBot';
import AWS from 'aws-sdk';


AWS.config.apiVersions = {
    translate: '2017-07-01',
  }

  var translate = new AWS.Translate();
  AWS.config.update({
    accessKeyId: 'AKIAS73YTZZYZGXS56UN',
    secretAccessKey: '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',
    region: 'us-east-1',
  })
  const S3_BUCKET ='archivos-grupo5-p1/seminario';
  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: 'us-east-1',
  })
var params = {
    SourceLanguageCode: 'auto',
    TargetLanguageCode: 'es',
    Text: 'Hello! My name is Fernando.'
  };




function Information ()  {
    const [username, setusername] =useState("")
    const user = JSON.parse(localStorage.getItem('usuario'));
    const [modalChatBot, setModalChatBot] = useState(false);
    //console.log(user.attributes['custom:susname'])

    let usuarioName = user.attributes['custom:nombre']
    let usuarioUser = user.attributes['custom:susname']
    let usuarioEmail = user.attributes['email']
 

 
    const [datosNuevos, setDatosNuevos] = useState({
        name: "",      
        username: "", 
        imgurl: "",  
        bot: "",  
        actualusername: "",   
        Pass: "",    
        confirmPass:"",
    });

    const obtenerDatos = async () => {
      
       const infoUer= await methodPOST(infoUsuario,{ "username":user.attributes['custom:susname']})
       console.log(infoUer)
       setDatosNuevos({
            name: infoUer.name,
            username: infoUer.username,
            email: infoUer.email,
            Pass: infoUer.password,
            imgurl: infoUer.url,
            bot: infoUer.bot,
            actualusername:infoUer.username
       })
    };

    const cambiarDatos = async () => {
        // console.log(datosNuevos)
        if(datosNuevos.confirmPass===datosNuevos.Pass){
        await methodPUT(updateInfoUser,datosNuevos)
        const user = await Auth.currentAuthenticatedUser()
        const response=  await Auth.updateUserAttributes(user, {
            'custom:nombre': datosNuevos.name,
            'custom:susname': datosNuevos.username,
        })
        // console.log(response)
        swal("Success",`${response}`, "success");
    }else{
        swal("Error","Las contraseñas no coinciden", "error");
    }
    }

    const handleFileInput = (e) => {
        uploadFile(e.target.files[0])
    }
    const [progress , setProgress] = useState(0);
  
    const uploadFile = (file) => {
        datosNuevos.imgurl=`https://archivos-grupo5-p1.s3.us-east-2.amazonaws.com/seminario/${file.name}`
      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
      };
      
      myBucket.putObject(params)
          .on('httpUploadProgress', (evt) => {
              setProgress(Math.round((evt.loaded / evt.total) * 100))
          })
          .send((err) => {
              if (err) console.log(err)
          })
  }



      useEffect(() => {
        obtenerDatos()
        setusername(user.attributes['custom:susname'])
        }, [])







    return (
      <div>
        <Barra/>
        <br></br>



        <Text h1 size={60} css={{ textGradient: "45deg, $blue400 -20%, $cyan600 50%", }} weight="bold">
            Bienvenido 
        </Text>
        <Text h1 size={60} css={{ textGradient: "45deg, $blue600 -20%, $green600 100%", }} weight="bold">
            {usuarioUser}
        </Text>
        <br></br>



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
                                    {datosNuevos.name}
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
                                    {datosNuevos.username}
                                </Text>
                            </Col>
                        </Row>


                        <Row>
                            <Col>
                                <Text color="white" css={{ m: 0 }}>
                                    Email:
                                </Text>
                            </Col>
                            <Col>
                                <Text color="black" css={{ m: 0 }}>
                                    {usuarioEmail}
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
                                    {datosNuevos.bot}
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
                    src={datosNuevos.imgurl}
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
                        value={datosNuevos.name}
                        onChange={(e) => {datosNuevos.name=e.target.value}}
                    />
                </Row>
                <br></br><br></br>


                <Row>
                    <Input
                        bordered
                        labelPlaceholder="username" color="primary"
                        id="Apellido" name="Apellido"
                        value={datosNuevos.username}
                        onChange={(e) => {datosNuevos.username=e.target.value}}
                    />
                </Row>
                <br></br><br></br>

                <Row>
                <input
                    class="form-control"
                    type="file"
                    accept="image/*"
                    name="avatar-file"
                    onChange={handleFileInput}
                  />
                </Row>
                <br></br><br></br>

                <Row>
                    <Input
                        bordered
                        labelPlaceholder="Modo boot" color="primary"
                        id="Boot" name="Boot"
                        value={datosNuevos.bot}
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
                        onChange={(e) => {datosNuevos.confirmPass=e.target.value}}
                    />
                </Row>
                <br></br><br></br>



                <Row>
                    <Button auto ghost color="primary" onPress={() => cambiarDatos()} >
                        Modificar datos
                    </Button>
                </Row>            
            </Grid>
        </Grid.Container>

       
        <br></br><br></br><br></br><br></br>
        <Button color="primary" onPress={() => setModalChatBot(true)} style={{}}>
                        ChatBot
        </Button>
  
        
        <ChatBot
            modalIsOpen={modalChatBot}
            closeModal={()=>{setModalChatBot(false)
                console.log("cerrar")
            } }
        />
      </div>
    );
  };
  
  export default Information;

  