import React, { useRef, useState } from "react"
import { Text, Button } from "@nextui-org/react";
import {methodPOST, crearPost} from "../../services/api";

import swal from 'sweetalert'

import Barra from '../Barra/Barra';
import { Form, Col, Row } from 'react-bootstrap'
import AWS from 'aws-sdk';



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


function CreatePost () {

    const username = JSON.parse(localStorage.getItem('usuario'));

    let escrito = useRef()


   
    const [nuevaImagen,setNuevaImagen]=useState("")

    let enviarDatos = async () => {
        let miUsuario1 = username.attributes['custom:susname']
        let nuevoEscrito = escrito.current.value

            console.log(nuevaImagen)

        const publicar = await methodPOST(crearPost, {"author":miUsuario1, "contents":nuevoEscrito, "base64img":nuevaImagen})
        
        
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
        
    }

    const [progress , setProgress] = useState(0);
    const handleFileInput = (e) => {
        uploadFile(e.target.files[0])
        // console.log(e.target.files[0])
    }
    const uploadFile = (file) => {
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
        setNuevaImagen(`https://archivos-grupo5-p1.s3.us-east-2.amazonaws.com/seminario/${file.name}`)
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
                            <input type="file" multiple onChange={handleFileInput} />
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
