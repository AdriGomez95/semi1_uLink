import React, { useState, useEffect } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { Button } from 'react-bootstrap'
import swal from 'sweetalert'

import Barra from "../Barra/Barra"


const FriendRequest = () => {
    let [datatable, setDatatable] = useState({})



    useEffect(() => {
        const columns = [
            {
                label: 'Nombre',
                field: 'nombre',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Nombre',
                },
            },
            {
                label: 'Usuario',
                field: 'usuario',
                width: 200,
            },
            {
                label: 'Modo boot',
                field: 'boot',
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

        fetch("http://localhost:9000/listado_usuarios", requestOptions)
            .then(response => response.json())
            .then(result => {
                let filas = result.map((e) => {
                    if (e.estado !== '') {
                        return {
                            ...e, aceptar: <Button variant="success" onClick={() => { aceptar(e) }}>
                                Aceptar
                            </Button>,
                            rechazar: <Button variant="danger" onClick={() => { rechazar(e) }}>
                                Rechazar
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


    const aceptar = (datatable) => {
        let myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        let a = JSON.stringify(datatable)

        let requesOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: a,
            redirect: 'follow'
        }

        fetch("http://localhost:9000/aceptar_solicitud", requesOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)

                swal({
                    title:"Aceptado",
                    text: "Se ha aceptado la solicitud",
                    icon: "success",
                    timer: 1000,
                });
                /*
                if (result.status === 200) {
                    swal({
                        title:"Enviado",
                        text: "Se ha enviado la solicitud",
                        icon: "success",
                        timer: 1000,
                    });
                }*/
            })
            .catch(error => console.log('error', error))


    }




    const rechazar = (datatable) => {
        let myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        let a = JSON.stringify(datatable)

        let requesOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: a,
            redirect: 'follow'
        }

        fetch("http://localhost:9000/rechazar_solicitud", requesOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)

                swal({
                    title:"Rechazado",
                    text: "Se ha rechazado la solicitud",
                    icon: "warning",
                    timer: 1000,
                });
            })
            .catch(error => console.log('error', error))
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