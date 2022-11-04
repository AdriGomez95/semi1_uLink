import { useRef } from "react"
import { Text, Button} from "@nextui-org/react";
import swal from 'sweetalert'
import {methodPOST, crearPost} from "../../services/api";


import Barra from '../Barra/Barra';
import { Form, Col, Row } from 'react-bootstrap'




function CreatePost () {

    const username = JSON.parse(localStorage.getItem('usuario'));


    let escrito = useRef()
    let imagen = useRef()

    let enviarDatos = async () => {
        let miUsuario = username.attributes['custom:susname']
        let nuevoEscrito = escrito.current.value
        let nuevaImagen = imagen.current.value  //cambiale este valor proven


        console.log(miUsuario, ' ', nuevoEscrito, ' ', nuevaImagen)


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
                            <Form.Control type="text" placeholder="Contenido de supublicacion" ref={imagen}  />
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
