import React, { Component, Fragment, useEffect, useState } from "react";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import {Link} from "react-router-dom"

const Daters = (props) => {
    const [daters, setDaters] = useState([])
    const currentUser = authService.getCurrentUser();
    const [error, setError] = useState()

    useEffect(() => {
        userService.getUsers()
        .then(response => {
            console.log('response', response)
            if(response.status === 200) {
                console.log('daters received.');
                setDaters(response.data.daters);
            } else {
                setError(`No dater founded`);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div className="container">
            <h3>Liste des daters</h3>
            <h5>current user: {currentUser.username}</h5>
            <ul>
                {
                    daters.length > 0
                    ?
                    daters.map((dater, index) => {
                        return(
                            <Link key={index} to={`/todate/${dater.id}`}>
                                <li key={index}>{dater.username}</li>
                            </Link>
                        )
                    })
                    :
                    <h4>{error}</h4>
                }
            </ul>
        </div>
    )

}

export default Daters;
