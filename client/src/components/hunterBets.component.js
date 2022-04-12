import React, { Fragment, useEffect, useState } from "react";
import { currentDay } from "../helpers/currentDay";
import authService from "../services/auth.service";
import hunterBetsService from "../services/hunterBets.service";

const HunterBets = (props) => {
    const date = props.date
    const [bets, setBets] = useState([])
    const [error, setError] = useState();
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        hunterBetsService.findAllByDate(date.id)
        .then(response => {
            if(response.status === 200) {
                setBets(response.data.hunterBets)
            } else {
                setError(`hunterbets not found`);
            }
        })
        .catch(err => {
            console.log('err', err)
        })
    }, [date.id, bets])

    return (
        <Fragment>
            <h3 className="title">my bets on daters</h3>
            <div className="row">
                {
                    bets.length > 0
                    ?
                    bets.map((bet, index) => {
                        return (
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <div key={index} className="card">
                                    <div className="card-header">{bet.daterh.username}</div>
                                    <div className="card-body">
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                D1: { bet.amount_0 ? bet.amount_0 : 'X' } ETH
                                            </li>
                                            <li className="list-group-item">
                                                D2: { bet.amount_1 ? bet.amount_1 : 'X' } ETH
                                            </li>
                                            <li className="list-group-item">
                                                D3: { bet.amount_2 ? bet.amount_2 : 'X' } ETH
                                            </li>
                                            <li className="list-group-item">
                                                D4: { bet.amount_3 ? bet.amount_3 : 'X' } ETH
                                            </li>
                                            <li className="list-group-item">
                                                D5: { bet.amount_4 ? bet.amount_4 : 'X' } ETH
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <p>{error}</p>
                }
            </div>
        </Fragment>
    )
}

export default HunterBets;