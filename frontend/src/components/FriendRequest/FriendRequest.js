import React, { useState, useEffect } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { Button } from 'react-bootstrap'
import swal from 'sweetalert'

import Barra from "../Barra/Barra"
import {methodPUT, aceptarSolicitud} from "../../services/api";



const FriendRequest = () => {
    let [datatable, setDatatable] = useState({})


    const username = JSON.parse(localStorage.getItem('usuario'));

    useEffect(() => {
        const columns = [
            {
                label: 'Usuario',
                field: 'user',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Usuario',
                },
            },
            {
                label: 'Estado',
                field: 'state',
                width: 200,
            },
            {
                label: 'Aceptar solicitud',
                field: 'aceptar',
                width: 200,
            },
            {
                label: 'Rechazar solicitud',
                field: 'rechazar',
                width: 200,
            }
        ]

        let formdata = new FormData()
        let requestOptions = {
            method: 'GET',
            data: formdata,
            redirect: 'follow'
        }

        fetch(`https://cw7ed1p5b3.execute-api.us-east-1.amazonaws.com/prod/requests/`+ username.attributes['custom:susname'], requestOptions)
            .then(response => response.json())
            .then(result => {
                let filas = result.map((e) => {
                    if (e.estado !== '') {
                        if(e.state === 'acepted'){
                            return {
                                ...e, 
                                aceptar: <Button disabled="true" variant="success" onClick={() => { aceptar(e) }}>
                                    Aceptar
                                </Button>,
                                rechazar: <Button variant="warning" onClick={() => { rechazar(e) }}>
                                    Eliminar
                                </Button>
                            }
                        }else if(e.state === 'denied'){                            
                            return {
                                ...e, 
                                aceptar: <Button disabled="true"  variant="success" onClick={() => { aceptar(e) }}>
                                    Aceptar
                                </Button>,
                                rechazar: <Button disabled="true" variant="danger" onClick={() => { rechazar(e) }}>
                                    Rechazar
                                </Button>
                            }
                        }else if(e.state === 'pending'){                            
                            return {
                                ...e, 
                                aceptar: <Button variant="success" onClick={() => { aceptar(e) }}>
                                    Aceptar
                                </Button>,
                                rechazar: <Button variant="danger" onClick={() => { rechazar(e) }}>
                                    Rechazar
                                </Button>
                            }
                        }
                        
                    } else {
                        return false
                    }


                })
                setDatatable({ columns: columns, rows: filas })
            })
            .catch(error => console.log('error', error))

    }, [])


    const aceptar = async (datatable) => {
        
        const acepta = await methodPUT(aceptarSolicitud, {"user":datatable.user, "friend":username.attributes['custom:susname'], "answer":"acepted"})


        if(acepta){
            swal({
                title:"Aceptado",
                text: "Se ha aceptado la solicitud",
                icon: "success",
                timer: 1000,
            });
        }else{
            swal({
                title:"Error",
                text: "No se envio la solicitud",
                icon: "Error",
                timer: 1000,
            });
        }
    }




    const rechazar = async (datatable) => {
        
        const rechaza = await methodPUT(aceptarSolicitud, {"user":datatable.user, "friend":"adrigomez", "answer":"denied"})


        if(rechaza){
            swal({
                title:"Aceptado",
                text: "Se ha rechazado la solicitud",
                icon: "success",
                timer: 1000,
            });
        }else{
            swal({
                title:"Error",
                text: "No se rechazo la solicitud",
                icon: "Error",
                timer: 1000,
            });
        }
    }





    return (
        <div>
            <Barra />
            <br></br><br></br>


            <br></br>
            <br /><br />
            <center>
                <h1 className="h1">Nuevas solicitudes</h1>
            </center>
            <br /><br />


            <br /><br />
            <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} searchTop searchBottom={false} />;


        </div>
    )
}


export default FriendRequest