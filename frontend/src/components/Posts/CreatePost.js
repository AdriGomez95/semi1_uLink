import React, { useRef, useState } from "react"
import { Text, Button } from "@nextui-org/react";
import {methodPOST, crearPost} from "../../services/api";


import Barra from '../Barra/Barra';
import { Form, Col, Row } from 'react-bootstrap'
import AWS from 'aws-sdk';



    AWS.config.update({
        accessKeyId: 'AKIAS73YTZZYZGXS56UN',
        secretAccessKey: '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',
    })
    const S3_BUCKET ='archivos-grupo5-p1/seminario';
    const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET},
        region: 'us-east-1',
    })


function CreatePost () {

    const username = JSON.parse(localStorage.getItem('usuario'));

    let escrito = useRef()
    let imagen = useRef()
    let nombreImagen = useRef()
    var arrayAuxiliar = []



    //----> BASE 64    
    const convertirBase64 = (archivos) => {
        nombreImagen = archivos[0].name
        Array.from(archivos).forEach(archivo => {
            var reader = new FileReader()
            reader.readAsDataURL(archivo)
            reader.onload = function () {
                var base64 = reader.result
                arrayAuxiliar = base64.split(',')
            }
        })
    }


    let enviarDatos = async () => {
        //let miUsuario1 = username.attributes['custom:susname']
        let name1 = nombreImagen
        let nuevaImagen1 = arrayAuxiliar[1]


        //console.log(url1)
        let datos = {
            imgbase64: nuevaImagen1,
            name: name1
        }


        let myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        let a = JSON.stringify(datos)
        
        console.log(a)
        console.log(datos)

        let requesOptions = {
            method: 'POST',
            headers: myHeaders,
            body: datos,
            redirect: 'follow'
        } 

        fetch("https://cw7ed1p5b3.execute-api.us-east-1.amazonaws.com/prod/uploadImage", requesOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error))



/*
        const publicar = await methodPOST(crearPost, {"author":miUsuario, "contents":nuevoEscrito, "base64img":nuevaImagen})


        if(publicar){
            swal({
                title:"Aceptado",
                text: "Se ha publicado con exito!",
                icon: "success",
                timer: 1000,
            });
        }else{
            swal({
                title:"Error",
                text: "No se publico nada",
                icon: "Error",
                timer: 1000,
            });
        }
        */
    }

    const [progress , setProgress] = useState(0);
    const handleFileInput = (e) => {
        uploadFile(e.target.files[0])
    }
    const uploadFile = (file) => {
      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
      };
      
      imagen=`https://archivos-grupo5-p1.s3.us-east-2.amazonaws.com/seminario/${file.name}`
  
      myBucket.putObject(params)
          .on('httpUploadProgress', (evt) => {
              setProgress(Math.round((evt.loaded / evt.total) * 100))
          })
          .send((err) => {
              if (err) console.log(err)
          })
  }


    return (
        <div>
            <Barra/>
            <br></br><br></br>


            <Text
                    h1
                    size={80}
                    css={{
                        textGradient: "45deg, $blue600 -20%, $green600 100%",
                    }}
                    weight="bold"
            >
                    Hacer Publicacion
            </Text>

            <br /><br />

            <Col>
            </Col>
            <Col>
            </Col>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <Form.Label column lg={2}>
                                Contenido
                            </Form.Label>  
                        </Col>
                        <Col>                 
                            <Form.Control type="text" placeholder="Contenido de su publicacion" ref={escrito}  />
                        </Col>
                    </Row>
                    <br/><br/>


                    <Row>
                        <Col>
                            <Form.Label column lg={2}>
                                Imagen
                            </Form.Label>  
                        </Col>
                        <Col>
                            <input type="file" multiple onChange={(e) => convertirBase64(e.target.files)} />
                        </Col>
                    </Row>
                </Col>





                <Col>
                    <Row>
                        <Button auto ghost color="gradient" onPress={() => enviarDatos()} >
                            Crear publicacion
                        </Button>
                    </Row>   
                </Col>
            </Row>

            <br /><br />
            

        </div>
    )
}


  
export default CreatePost;
