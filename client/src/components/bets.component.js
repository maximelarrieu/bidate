import React, { Fragment, useEffect, useState } from "react";
import { currentDay } from "../helpers/currentDay";
import authService from "../services/auth.service";
import daterBetsService from "../services/daterBets.service";
import hunterBetsService from "../services/hunterBets.service";
import HunterBets from "./hunterBets.component";

const Bets = (props) => {
    const date = props.date
    const [bets, setBets] = useState([]);
    const [bet, setBet] = useState();
    const [daterBetToday, setDaterBetToday] = useState();
    const [error, setError] = useState();
    const currentUser = authService.getCurrentUser();

    const checkDaterBetToday = async (date_id, dater_id, day) => {
        return await hunterBetsService.hunterHasBetsOnDaterToday(date_id, dater_id, day)
        .then(async response => {
            console.log('status', response.data.status)
            if (response.data.status === true) {
                console.log('OK')
                await setDaterBetToday(response.data.status)
                return true
            } else {
                await setDaterBetToday(response.data.status)
                return false
            }
        })
    }
    
    useEffect(() => {
        daterBetsService.findAllByDate(date.id)
        .then(response => {
            if(response.status === 200) {
                setBets(response.data.daterBets)
            } else {
                setError(`daterbets not found`);
            }
        })
        .catch(err => {
            console.log('ERROR', err)
        })
    }, [date.id, bets])

    const betOnDater = async (event, dater_id, date_id, day) => {
        event.preventDefault();
        await hunterBetsService.hunterHasBetOnDate(date_id, dater_id)
        .then(async response => {
            console.log('has previous bets on this dater')
            if(response.data.status === true) {
                await hunterBetsService.update(dater_id, date_id, day)
                .then(response => {
                    console.log('hunter bet updated')
                    console.log(response)
                })
                .catch(error => {
                    console.log("ERROR:", error)
                })
            } else {
                await hunterBetsService.create(dater_id, date_id, day)
                .then(response => {
                    if(response.status === 200) {
                        console.log('hunter bet started.')
                        setBet(response.data.hunterbet);
                        console.log('bet', bet)
                    } else {
                        setError('Bet not found')
                    }
                })
                .catch(error => {
                    console.log("ERROR", error)
                })
            }
        })
        .catch(error => {
            console.log("ERROR", error)
        })
    }

    return (
        <div className="container">
            <h1>BETS EN COURS</h1>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">username</th>
                            <th scope="col">D1</th>
                            <th scope="col">D2</th>
                            <th scope="col">D3</th>
                            <th scope="col">D4</th>
                            <th scope="col">D5</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        bets.length > 0
                        ?
                        bets.map((bet, index) => {
                            return (
                                <Fragment>
                                <tr key={index}>
                                    <td>{bet.userb.username}</td>
                                    <td>{bet.amount_0 ? bet.amount_0 : 'X' } ETH</td>
                                    <td>{bet.amount_1 ? bet.amount_1 : 'X' } ETH</td>
                                    <td>{bet.amount_2 ? bet.amount_2 : 'X' } ETH</td>
                                    <td>{bet.amount_3 ? bet.amount_3 : 'X' } ETH</td>
                                    <td>{bet.amount_4 ? bet.amount_4 : 'X' } ETH</td>
                                    {
                                        currentUser.type_id === 2
                                        ?
                                        <td>
                                            {
                                                currentUser.id === bet.userb.id
                                                ?
                                                <button className="btn btn-sm btn-success" onClick={(e) => betOnDater(e, bet.userb.id, date.id)} disabled>Bet on</button>
                                                :
                                                <button className="btn btn-sm btn-success" onClick={(e) => betOnDater(e, bet.userb.id, date.id, currentDay(date.endedAt))}>Bet on</button>
                                                   
                                            }
                                        </td>
                                        :
                                        <td>
                                            <button className="btn btn-sm btn-success" disabled>Bet on</button>
                                        </td>
                                    }
                                </tr>
                                </Fragment>
                            )
                        })
                        :
                        <tr>
                            <td>{ error }</td>
                            <td>{ error }</td>
                            <td>{ error }</td>
                        </tr>

                    }
                    </tbody>
                </table>
            </div>
            <HunterBets date={date} />
        </div>
    )
}

export default Bets;