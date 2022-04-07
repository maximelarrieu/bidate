import React, { Fragment, useEffect, useState } from "react";
// import { ReactNode } from "react";
// import { Flex, useDisclosure } from "@chakra-ui/react";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import dateService from "../services/date.service";
import { useParams } from 'react-router-dom';

const Dater = (props) => {
    const { id } = useParams();
    const [date, setDate] = useState();
    const [dates, setDates] = useState([]);
    // const [isEnded, setIsEnded] = useState();
    const [dater, setDater] = useState();
    const currentUser = authService.getCurrentUser();
    const [error, setError] = useState()

    const calculateAge = (birthdate) => {
        var ageDifMs = Date.now() - new Date(birthdate).getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const remainingTime = (startedAt) => {
        let now = new Date()
        let time = {}

        let tmp = new Date(startedAt) - now
        tmp = Math.floor(tmp/1000)
        time.seconds = tmp % 60

        tmp = Math.floor((tmp - time.seconds)/60)
        time.minutes = tmp % 60

        tmp = Math.floor((tmp - time.minutes)/60)
        time.hours = tmp % 24

        tmp = Math.floor((tmp - time.hours)/24)
        time.days = tmp

        let remaining = `End in `
        if (time.days > 0) {
            remaining += `${time.days}j `
        }
        if (time.hours > 0) {
            remaining += `${time.hours}h `
        }
        if (time.minutes >= 0) {
            remaining += `${time.minutes}m `
        }
        if (time.seconds >= 0) {
            remaining += `${time.seconds}s`
        }
        return remaining
    }

    useEffect(() => {
        userService.getUser(id)
        .then(response => {
            if(response.status === 200) {
                setDater(response.data.dater);
            } else {
                setError(`Dater not found`);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }, [id]);

    useEffect(() => {
        dateService.getCurrentDate(id)
        .then(response => {
            if(response.status === 200) {
                setDate(response.data.date)
            } else {
                setError(`Date not found`);
            }
        })
        .catch(err => {
            console.log('ERROR', err)
        })
    }, [id])

    useEffect(() => {
        dateService.findAllByDater(id)
        .then(response => {
            if(response.status === 200) {
                setDates(response.data.dates)
            } else {
                setError(`Date not found`);
            } 
        })
    }, [id])

    const startDate = async (event) => {
        event.preventDefault();
        const data = {
            user_id: currentUser.id,
            isEnded: 0 
        }
        await dateService.create(data)
        .then(response => {
            if(response.status === 200) {
                console.log('date started.')
                setDate(response.data.date);
            } else {
                setError('Date not found')
            }
        })
    }
    
    return (
        <div className="container">
        <h5>current user: {currentUser.username}</h5>
            <div className="row">
                <div className="col-sm-12 col-md-3 col-lg-3 border">
                    {
                        // If dater was found
                        dater !== undefined
                        ?
                        // True
                        <Fragment>
                        <h3>{dater.username}</h3>
                        <h4>{calculateAge(dater.birthdate)} ans</h4>
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
                        // False
                        <h3>{error}</h3>
                    }
                </div>
                <div className="col-sm-12 col-md-6 col-sm-3 border">
                    {
                        // If date was found
                        date !== undefined
                        ?
                        <Fragment>
                            <p>{remainingTime(date.endedAt)}</p>
                            {
                                // If dater type
                                dater.type.name === 'hunter'
                                ?
                                // Is hunter
                                <p>hunter space</p>
                                :
                                // Is dater
                                <Fragment>
                                    <p>dater space</p>
                                    {
                                        // If current user is date starter
                                        date.user_id === currentUser.id
                                        ?
                                        // True
                                        <button type='button' className='btn btn-secondary' disabled>Start my dates</button> 
                                        :
                                        // False
                                        <Fragment></Fragment>
                                        
                                        
                                    }
                                </Fragment>
                            }
                        </Fragment>
                        :
                        // If date was not found
                        <Fragment>
                            {
                                // If dater
                                dater !== undefined
                                ?
                                // True
                                    // If dater is current starter
                                    dater.id === currentUser.id
                                    ?
                                    // True
                                    <div>
                                        <p>ah bon</p>
                                        <button type='button' className='btn btn-primary' onClick={startDate}>Start my dates</button> 
                                    </div>
                                    :
                                    // False
                                    <Fragment>Aucun date en cours pour ce dater</Fragment>
                                :
                                // False
                                <Fragment>nodater</Fragment>

                            }
                        </Fragment>
                    }
                </div>
                <div className="col-sm-12 col-md-3 col-lg-3 border">
                    <p>historique du dater</p>
                    <ul>
                        {
                            // If dater has dates
                            dates.length > 0
                            ?
                            // True
                            dates.map((date, index) => {
                                return (
                                    <li key={index}>
                                        { date.id } { date.createdAt } -&gt; { date.endedAt }
                                    </li>
                                )
                            })
                            :
                            // False
                            <Fragment>No dates for this dater</Fragment>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dater;