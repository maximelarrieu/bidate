import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { remainingTime } from "../helpers/remainingTime";
import { currentDay } from "../helpers/currentDay";
import dateService from "../services/date.service";
import daterBetsService from "../services/daterBets.service";
import Bets from "./bets.component";
import "../App.css";

const ADate = (props) => {
    const { id } = useParams();
    const dater = props.dater
    const [hasBet, setHasBet] = useState();
    const [todayBet, setTodayBet] = useState();
    const currentUser = props.currentUser
    const error = props.error
    const [date, setDate] = useState();
    const [new_bet, setBet] = useState();
    const [new_date, setNewDate] = useState();
    const [new_error, setError] = useState();

    console.log('DATE component', date)

    useEffect(() => {
        dateService.getCurrentDate(id)
        .then(response => {
            console.log('response date', response.data)
            if(response.status === 200) {
                setDate(response.data.date)
            } else {
                setError(`No current date`);
            }
        })
        .catch(err => {
            console.log('ERROR', err)
        })
    }, [id])

    // useEffect(() => {
    //     daterBetsService.daterHasBetsToday(date.id, currentDay(date.endedAt))
    //     .then(response => {
    //         console.log('repsonse', response)
    //         if (response.data.status === true) {
    //             setTodayBet(response.data.status)
    //         } else {
    //             setTodayBet(response.data.status)
    //         }
    //     })
    // }, [date.id, date.endedAt, date, todayBet])

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
                setNewDate(response.data.date);
                console.log('new date', new_date)
            } else {
                setError('Date not found')
            }
        })
    }

    const toBet = async (event, date_id, day) => {
        event.preventDefault();
        await daterBetsService.daterHasBets(date_id)
        .then(async response => {
            console.log('reponse has bets', response)
            if(response.data.status === true) {
                setHasBet(response.data.status)
                await daterBetsService.update(date_id, day)
                .then(response => {
                    console.log('reponse', response)
                })
                .catch(error => {
                    console.log("ERROR", error)
                })
            } else {
                console.log('no bet found for this dater');
                await daterBetsService.create(date_id, day)
                .then(response => {
                    if(response.status === 200) {
                        console.log('bet started.')
                        setBet(response.data.daterbet);
                        console.log('bet', new_bet)
                    } else {
                        setError('Bet not found')
                    }
                })
                .catch(error => {
                    console.log('ERROR', error)
                })
            }
        })
    }

    console.log('date in date', date)
    console.log('dater in date', dater)

    return (
        <Fragment>
            {
                // If in course date
                date !== undefined
                ?
                // True
                <Fragment>
                    <h2>date id: {date.id}</h2>
                    <p>Temps restant: {remainingTime(date.endedAt)}</p>
                    <p>Jour du date: {currentDay(date.endedAt)}</p>
                    {
                        date.user_id === currentUser.id
                        ?
                        <Fragment>
                            <p>Date en cours !</p>
                            <button type='button' className='btn btn-secondary' disabled>Start my dates</button> 
                        </Fragment>
                        :
                        <Fragment>
                            <p>Date en cours !</p>
                            <p>Tente ta chance tous les jours !</p>
                            {
                                todayBet === true
                                ?
                                <button disabled type="button" className="btn btn-warning" onClick={(e) => toBet(e, date.id, currentDay(date.endedAt))}>Next bet tomorrow</button>
                                :
                                <button type="button" className="btn btn-warning" onClick={(e) => toBet(e, date.id, currentDay(date.endedAt))}>Make a bet</button>
                            }
                        </Fragment>
                    }
                    <Bets date={date} />
                </Fragment>
                :
                //False
                <Fragment>
                    {
                        dater !== undefined
                        ?
                            // If dater is currentUser
                            dater.id === currentUser.id
                            ?
                            // True
                            <div>
                                <p>Tu n'as pas démarré de date</p>
                                <p>C'est parti?</p>
                                {/* Can start a date */}
                                <button type='button' className='btn btn-primary' onClick={startDate}>Start a date</button> 
                            </div>
                            :
                            <div className="container center">
                                <p>Pas de date en cours pour cet utilisateur</p>
                                <p>Reviens plus tard...</p>
                            </div>
                        :
                        <p>Dater not found</p>
                    }
                </Fragment>
            }
        </Fragment>
    )
}

export default ADate;