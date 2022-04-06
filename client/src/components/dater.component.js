import React, { Component, Fragment, useEffect, useState } from "react";
import { ReactNode } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import { useParams } from 'react-router-dom';

const Dater = (props) => {
    const { id } = useParams();
    const [dater, setDater] = useState();
    const currentUser = authService.getCurrentUser();
    const [error, setError] = useState()

    useEffect(() => {
        userService.getUser(id)
        .then(response => {
            if(response.status === 200) {
                console.log('dater received.');
                setDater(response.data.dater);
            } else {
                setError(`Dater not found`);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [id]);

    return (
        <div className="container">
        <h5>current user: {currentUser.username}</h5>
            {
                dater !== undefined
                ?
                <Fragment>
                <h3>User choisi : {dater.username}</h3>
                <ul>
                    <b>type:</b>
                    <li>{dater.type.name}</li>
                    <b>role(s):</b>
                    {dater.roles.map((role, index) => {
                        return (
                            <li key={index}>{role.name}</li>
                        )
                    })}
                </ul>
                </Fragment>
                :
                <h3>{error}</h3>
            }
        </div>
    )
}

export default Dater;