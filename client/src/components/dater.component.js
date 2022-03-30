import React, { Component, Fragment, useEffect, useState } from "react";
import { ReactNode } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import { useParams } from 'react-router-dom';

const Dater = (props) => {
    const { id } = useParams();
    const [dater, setDater] = useState([]);

    useEffect(() => {
        userService.getUser(id)
        .then(response => {
            setDater(response.data.dater)
        })
        .catch(err => {
            console.log(err);
        })
    }, [id]);

    return (
        <div className="container">
            <h3>User choisi : {dater.username}</h3>
        </div>
    )
}

export default Dater;