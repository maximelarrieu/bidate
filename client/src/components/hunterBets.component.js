import React, { Fragment, useEffect, useState } from "react";
import { currentDay } from "../helpers/currentDay";
import authService from "../services/auth.service";
import hunterBetsService from "../services/hunterBets.service";

const HunterBets = (props) => {
    const date = props.date
    const [bets, setBets] = useState([])
    const [mybets, setMyBets] = useState([])
    const [error, setError] = useState();
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        hunterBetsService.findAllByDate(date.id)
        .then(response => {
            // console.log('RESPONSE hunter', response)
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

    useEffect(() => {
        hunterBetsService.findAllMineByDate(date.id)
        .then(response => {
            if(response.status === 200) {
                setMyBets(response.data.hunterBets)
            }
            else {
                setError(`my hunterbets not found`);
            }
        })
        .catch(err => {
            console.log('err', err)
        })
    }, [mybets])

    return (
        <Fragment>
            {
                currentUser.type_id === 2
                ?
                <div>
                    <h3 className="page-subtitle mt-5 mb-2">My hunter bets</h3>
                    <div className="row">

                    {
                        mybets.length > 0
                        ?
                        mybets.map((bet, index) => {
                            return (
                                <div className="col-sm-12 col-md-6 col-lg-3">
                                    <div key={index} className="card">
                                        <div className="card-header">{bet.userh.username}</div>
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
                                        <div className="card-footer">
                                            <p>on - {bet.daterh.username}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <p>{error}</p>
                    }
                    </div>
                </div>
                :
                <p></p>
            }
            
            <h3 className="page-subtitle mt-5">Hunters bets on daters</h3>
            <div className="table-responsive mt-2">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">hunter</th>
                            <th scope="col">dater</th>
                            <th scope="col">D1</th>
                            <th scope="col">D2</th>
                            <th scope="col">D3</th>
                            <th scope="col">D4</th>
                            <th scope="col">D5</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        bets.length > 0
                        ?
                        bets.map((bet, index) => {
                            return (
                                <tr key={index}>
                                    <td>{bet.userh.username}</td>
                                    <td>{bet.daterh.username}</td>
                                    <td>{bet.amount_0 ? bet.amount_0 : 'X' } ETH</td>
                                    <td>{bet.amount_1 ? bet.amount_1 : 'X' } ETH</td>
                                    <td>{bet.amount_2 ? bet.amount_2 : 'X' } ETH</td>
                                    <td>{bet.amount_3 ? bet.amount_3 : 'X' } ETH</td>
                                    <td>{bet.amount_4 ? bet.amount_4 : 'X' } ETH</td>
                                </tr>
                            )
                        })
                        :
                        <p>{error}</p>
                    }
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default HunterBets;