import { Grid, Card, Text, Row, Col, Input, Button } from "@nextui-org/react";

import Barra from "../Barra/Barra";
import foto from './fotoPerfil.jpg'




function Information ()  {




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
                    />
                </Row>
                <br></br><br></br>


                <Row>
                    <Input
                        bordered
                        labelPlaceholder="Usuario" color="primary"
                        id="Usuario" name="Usuario"
                    />
                </Row>
                <br></br><br></br>

                <Row>
                    <Input
                        bordered
                        labelPlaceholder="Modo boot" color="primary"
                        id="Boot" name="Boot"
                    />
                </Row>
                <br></br><br></br>

                <Row>
                    <Input
                        id="filled-adornment-password"
                        type='password'
                        bordered
                        color="primary" placeholder=" Contraseña"
                    />
                </Row>
                <br></br>


                <Row>
                    <Input
                        id="filled-adornment-password"
                        type='password'
                        bordered
                        color="primary" placeholder="Confirmar contraseña"
                    />
                </Row>    
                <br></br>


                <Row>
                    <Button auto ghost color="primary" onClick="">
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

  