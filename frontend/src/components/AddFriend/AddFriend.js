import React, { useState, useEffect } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { Button } from 'react-bootstrap'
import swal from 'sweetalert'

import Barra from "../Barra/Barra"
import {methodPOST,enviarSolicitud} from "../../services/api";

const AddFriend = () => {
    let [datatable, setDatatable] = useState({})

    const user = JSON.parse(localStorage.getItem('usuario'));
    //console.log('Mi usuario:',user.attributes['custom:susname'])

    useEffect(() => {
        const columns = [
            {
                label: 'Nombre',
                field: 'name',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Nombre',
                },
            },
            {
                label: 'Usuario',
                field: 'username',
                width: 200,
            },
            {
                label: 'Modo boot',
                field: 'bot',
                width: 200,
            },
            {
                label: 'Enviar solicitud',
                field: 'enviar',
                width: 200,
            }
        ]

        let formdata = new FormData()
        let requestOptions = {
            method: 'GET',
            data: formdata,
            redirect: 'follow'
        }


        fetch(`http://localhost:8080/users/`+ user.attributes['custom:susname'], requestOptions)
            .then(response => response.json())
            .then(result => {
                let filas = result.map((e) => {
                    if (e.estado !== '') {
                        return {
                            ...e, enviar: <Button variant="success" onClick={() => { solicitud(e) }}>
                                Enviar
                            </Button>
                        }
                    } else {
                        return false
                    }


                })
                setDatatable({ columns: columns, rows: filas })
            })
            .catch(error => console.log('error', error))

    }, [])


    const solicitud = async (datatable) => {

        const enviaSolicitud = await methodPOST(enviarSolicitud,{ "user":user.attributes['custom:susname'], "friend":datatable.username})


        if(enviaSolicitud){
            swal({
                title:"Enviado",
                text: "Se ha enviado la solicitud",
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









    return (
        <div>
            <Barra />
            <br></br><br></br>


            <br></br>
            <br /><br />
            <center>
                <h1 className="h1">Listado de usuarios</h1>
            </center>
            <br /><br />


            <br /><br />
            <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} searchTop searchBottom={false} />;


        </div>
    )
}


export default AddFriend