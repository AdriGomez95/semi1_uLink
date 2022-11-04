import { useState, useEffect } from "react"
import { Text, Card, Grid,Button } from "@nextui-org/react";
import Barra from '../Barra/Barra';
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
 


  const arra =[
    {
        "usuario": "Fernando",
        "texto": "Hola",
        "imagen": "https://archivos-grupo5-p1.s3.us-east-1.amazonaws.com/seminario/WhatsApp+Image+2021-05-05+at+11.39.11+PM.jpeg",
        "tags":[{ "tag": "seminario" },{ "tag": "seminario2" }, { "tag": "seminario3" }]
    },
    {
        "usuario": "Fernando",
        "texto": "Hola, soy Fernando",
        "imagen": "https://archivos-grupo5-p1.s3.us-east-1.amazonaws.com/seminario/WhatsApp+Image+2021-05-05+at+11.39.11+PM.jpeg",
        "tags":[{ "tag": "seminario" }, { "tag": "seminario2" }, { "tag": "seminario3" }]
    },
    {
        "usuario": "Fernando",
        "texto": "Adiós",
        "imagen": "https://archivos-grupo5-p1.s3.us-east-1.amazonaws.com/seminario/WhatsApp+Image+2021-05-05+at+11.39.11+PM.jpeg",
        "tags":[{ "tag": "seminario" }, { "tag": "seminario2" }, { "tag": "seminario3" }]
    },
    {
        "usuario": "Fernando",
        "texto": "carros",
        "imagen": "https://archivos-grupo5-p1.s3.us-east-1.amazonaws.com/seminario/WhatsApp+Image+2021-05-05+at+11.39.11+PM.jpeg",
        "tags":[{ "tag": "seminario" }, { "tag": "seminario2" }, { "tag": "seminario3" }]
    },
  ]
 

function Posts () {

    const [PublicacionesFiltradas, setPublicacionesFiltradas] = useState([])
    const [constador, setContador] = useState(0)
  
    
    
    useEffect(() => {
        let formdata2 = new FormData()
        let requestOptions2 = {
            method: 'GET',
            data: formdata2,
            redirect: 'follow'
        }
      
        // fetch("http://localhost:9000/publicaciones", requestOptions2)
        //     .then(response => response.json())
        //     .then(result => setPublicacionesFiltradas(result))
        //     .catch(error => console.log('error', error))
    }, [])
    const publicaciones =()=>{
        setPublicacionesFiltradas(arra)
    }

    
    const traducir = () => {
        let arratemp = PublicacionesFiltradas
        // setPublicacionesFiltradas([]) 
        for (let i = 0; i < arratemp.length; i++) {
            var params = {
                SourceLanguageCode: 'auto',
                TargetLanguageCode: 'en',
                Text: arratemp[i].texto
            };
            translate.translateText(params, function (err, data) {
                if (err) console.log(err, err.stack); 
                else  arratemp[i].texto = data['TranslatedText'];
            });    
            
        }
        setPublicacionesFiltradas([])
        //    setPublicacionesFiltradas(arratemp
    }


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
                    <Button color="primary" onPress={() => publicaciones()} style={{}}>
                        Ver Publicaciones
                    </Button>      
                    <Button color="primary" onPress={() => traducir()} style={{}}>
                        Translate
                    </Button>    
                </div>

                <Grid.Container gap={4} >
                    {
                    PublicacionesFiltradas?.map((item, index) => ( 
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
                                <Card.Footer>
                               {item.tags.map((item2, index) => (

                                    <Text key={index} css={{ color: "$gray600" }}>
                                         {item2.tag} {', '}
                                    </Text> 
                               
                                ))}

                                </Card.Footer>
                            </Card>  
                        </Grid>  
                    ))
                    }
      
                </Grid.Container>       


            </div>
        </>);
};


  
export default Posts;
