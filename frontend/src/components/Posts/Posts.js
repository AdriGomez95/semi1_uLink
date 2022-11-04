import { useState } from "react"
import { Text, Card, Grid,Button } from "@nextui-org/react";
import React from 'react'
import Select from 'react-select'
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
 

/*
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
 */
  const options = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'es-MX', label: 'Mexican Spanish ' },
    { value: 'fr', label: 'French' },
    { value: 'sq', label: 'Albanian' },
    { value: 'ca', label: 'Catalan' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ko', label: 'Korean' },
    { value: 'ru', label: 'Russian' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'zh', label: 'Chinese' },
    { value: 'th', label: 'Thai' },
    { value: 'tr', label: 'Turkish' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'de', label: 'German' },
  ]

function Posts () {

    const [PublicacionesFiltradas, setPublicacionesFiltradas] = useState([])
  
    const username = JSON.parse(localStorage.getItem('usuario'));
    


    const { values, handleInputChange } = useState({
        NombreBusqueda: ''
    });
        
    const [contador,setContador]=useState(0)
    let traducido=[]

   

    const traducir = (e) => {
        let arratemp = PublicacionesFiltradas
        for (let i = 0; i < arratemp.length; i++) {
            var params = {
                SourceLanguageCode: 'auto',
                TargetLanguageCode: e.value,
                Text: arratemp[i].contents
            };
            translate.translateText(params, function (err, data) {
                if (err) console.log(err, err.stack); 
                else  arratemp[i].contents = data['TranslatedText'];
            });    
            
        }
        traducido=arratemp
        setPublicacionesFiltradas([])
        hola()
    }
    const hola= ()=>{
        setPublicacionesFiltradas(traducido)

    }
    const siu=()=>{
    setContador(contador+1)
        }

  
    const publicaciones =()=>{
        let formdata2 = new FormData()
        let requestOptions2 = {
            method: 'GET',
            data: formdata2,
            redirect: 'follow'
        }
        fetch(`https://cw7ed1p5b3.execute-api.us-east-1.amazonaws.com/prod/readPosts/` + username.attributes['custom:susname'], requestOptions2)
        .then(response => response.json())
        .then(result => setPublicacionesFiltradas(result))
        .catch(error => console.log('error', error))
    }

    let FiltrarNombre = (e) => {
        e.preventDefault()


        if (values.NombreBusqueda !== '') {
            console.log("aca")
            
            let arregloFiltrado = PublicacionesFiltradas.filter(item => item.contents === values.contents);
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


                <input name="NombreBusqueda"  type="text" value={values.NombreBusqueda} onChange={handleInputChange} placeholder="Nombre"  onBlur={FiltrarNombre} />       
                    

                <div class= "cards"> 
                <Button color="primary" onPress={() => publicaciones()} style={{}}>
                        Ver Publicaciones
                    </Button>      
                    <Select options={options} 
                    onChange={traducir}
                    />
                    <Button color="primary" onPress={() => siu()} style={{}}>
                        Translate
                    </Button>    
                </div>

                <Grid.Container gap={4} >
                    {
                    PublicacionesFiltradas.map((item, index) => ( 
                        <Grid xs={12} sm={4} key={index}>
                            <Card css={{ p: "$6", mw: "330px" }}>
                                <Card.Header>
                                    <img
                                    alt="nextui logo"
                                    src={item.base64img}
                                    width="100px"
                                    height="100px"
                                    />
                                    <Grid.Container css={{ pl: "$6" }}>
                                        <Grid xs={12}>
                                            <Text h4 css={{ lineHeight: "$xs" }}>
                                            {item.author}
                                            </Text>
                                        </Grid>
                                    </Grid.Container>
                                </Card.Header>

                                <Card.Body css={{ py: "$2" }}>
                                    <Text>
                                    {item.contents}
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
