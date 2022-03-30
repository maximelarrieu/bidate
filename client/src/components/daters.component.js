import React, { Component, Fragment, useEffect, useState } from "react";
import { ReactNode } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import {Link} from "react-router-dom"


const Daters = (props) => {
    const [daters, setDaters] = useState([])
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        userService.getUsers().then(response => {
            console.log("RESPONSE", response);
            if(response.status === 200) {
                console.log('daters received.')
            } else {
                let messageError = 'Impossible de récupérer la liste des utilisateurs';
                return messageError;
            }
            setDaters(response.data.daters)
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    console.log('daters', daters);

    return (
        <div className="container">
            <h3>Liste des daters</h3>
            <h5>current user: {currentUser.username}</h5>
            <ul>
                {
                    daters.length > 0
                    ?
                    daters.map((dater) => {
                        return(
                            <Link to={`/todate/${dater.id}`}><li key={dater.id}>{dater.username}</li></Link>
                        )
                    })
                    :
                    <h4>Aucun daters</h4>
                }
            </ul>
        </div>
    )

}

export default Daters;
