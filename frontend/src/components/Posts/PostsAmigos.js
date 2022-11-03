import { useState, useEffect } from "react"
import { Text, Card, Grid } from "@nextui-org/react";

import { MDBDataTableV5 } from 'mdbreact'


import Barra from '../Barra/Barra';




function PostsAmigos () {

    return (
        <div>
            <Barra/>
            <br></br><br></br>


            <br></br>
            <br /><br />
                <Text
                    h1
                    size={80}
                    css={{
                        textGradient: "45deg, $blue600 -20%, $green600 100%",
                    }}
                    weight="bold"
                >
                    Publicaciones de amigos
                </Text>

            <br /><br />


            <br /><br />
            

        </div>
    )
}


  
export default PostsAmigos;
