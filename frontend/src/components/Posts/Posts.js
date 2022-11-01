import { useState, useEffect } from "react"
import { Text, Card, Grid } from "@nextui-org/react";



import Barra from '../Barra/Barra';




function Posts () {

    let [PublicacionesFiltradas, setPublicacionesFiltradas] = useState([])


    useEffect(() => {
        let formdata2 = new FormData()
        let requestOptions2 = {
            method: 'GET',
            data: formdata2,
            redirect: 'follow'
        }

        fetch("http://localhost:9000/publicaciones", requestOptions2)
            .then(response => response.json())
            .then(result => setPublicacionesFiltradas(result))
            .catch(error => console.log('error', error))
    }, [])



    let FiltrarNombre = (e) => {
        e.preventDefault()

        if (PublicacionesFiltradas.usuario !== '') {
            console.log("aca")

            let arregloFiltrado = PublicacionesFiltradas.filter(item => item.modelo === PublicacionesFiltradas.usuario);
            setPublicacionesFiltradas(arregloFiltrado)
        }
    }


    return (
        <>
            <div>
                <Barra/>
                <br></br>
                <Text
                    h1
                    size={80}
                    css={{
                        textGradient: "45deg, $blue600 -20%, $green600 100%",
                    }}
                    weight="bold"
                >
                    Publicaciones 
                </Text>



                <div class= "cards">        
                    <input name="Nombre"  type="text" placeholder="Nombre" value={PublicacionesFiltradas.usuario} onBlur={FiltrarNombre} />             
                </div>

                <Grid.Container gap={4} >
                    {
                    PublicacionesFiltradas.map((item, index) => ( 
                        <Grid xs={12} sm={4} key={index}>
                            <Card css={{ p: "$6", mw: "330px" }}>
                                <Card.Header>
                                    <img
                                    alt="nextui logo"
                                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                    width="34px"
                                    height="34px"
                                    />
                                    <Grid.Container css={{ pl: "$6" }}>
                                        <Grid xs={12}>
                                            <Text h4 css={{ lineHeight: "$xs" }}>
                                            {item.usuario}
                                            </Text>
                                        </Grid>
                                    </Grid.Container>
                                </Card.Header>

                                <Card.Body css={{ py: "$2" }}>
                                    <Text>
                                    {item.texto}
                                    </Text>
                                </Card.Body>
                            </Card>  
                        </Grid>  
                    ))
                    }
      
                </Grid.Container>       


            </div>
        </>);
};


  
export default Posts;
