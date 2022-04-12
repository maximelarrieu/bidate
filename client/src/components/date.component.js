import React, { Fragment, useEffect, useState } from "react";
import { remainingTime } from "../helpers/remainingTime";
import { currentDay } from "../helpers/currentDay";
import dateService from "../services/date.service";
import daterBetsService from "../services/daterBets.service";
import Bets from "./bets.component";

const ADate = (props) => {
    const date = props.date
    const dater = props.dater
    const [hasBet, setHasBet] = useState();
    const [todayBet, setTodayBet] = useState();
    const currentUser = props.currentUser
    const error = props.error
    const [new_bet, setBet] = useState();
    const [new_date, setDate] = useState();
    const [new_error, setError] = useState();

    useEffect(() => {
        daterBetsService.daterHasBetsToday(date.id, currentDay(date.endedAt))
        .then(response => {
            console.log('repsonse', response)
            if (response.data.status === true) {
                setTodayBet(response.data.status)
            } else {
                setTodayBet(response.data.status)
            }
        })
    }, [date.id, date.endedAt, date, todayBet])

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

    return (
        <Fragment>
            <p>date content</p>
            {
                // If in course date
                date !== undefined
                ?
                // True
                <Fragment>
                    <h2>date id: {date.id}</h2>
                    <p>{remainingTime(date.endedAt)}</p>
                    <p>{currentDay(date.endedAt)}</p>
                    {
                        date.user_id === currentUser.id
                        ?
                        <Fragment>
                            <p>profites des bets</p>
                            <button type='button' className='btn btn-secondary' disabled>Start my dates</button> 
                        </Fragment>
                        :
                        <Fragment>
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
                    <p>{error}</p>
                    {
                        dater !== undefined
                        ?
                            // If dater is currentUser
                            dater.id === currentUser.id
                            ?
                            // True
                            <div>
                                <p>no ah bon</p>
                                {/* Can start a date */}
                                <button type='button' className='btn btn-primary' onClick={startDate}>Start a date</button> 
                            </div>
                            :
                            <p>no in course date</p>
                        :
                        <p>no dater</p>
                    }
                </Fragment>
            }
        </Fragment>
    )
}

export default ADate;