import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { remainingTime } from "../helpers/remainingTime";
import { currentDay } from "../helpers/currentDay";
import dateService from "../services/date.service";
import daterBetsService from "../services/daterBets.service";
import Bets from "./bets.component";
import "../App.css";
import { ethers } from 'ethers';
import { contractABI, contractAddress } from "../helpers/constants";

import { Drizzle } from '@drizzle/store';
import { DrizzleContext } from '@drizzle/react-plugin';
import Greeter from '../artifacts/Greeter.json';
import Transactions from '../artifacts/Transactions.json';
const { ethereum } = window;

const drizzleOptions = {
  contracts: [Greeter, Transactions]
}

const drizzle = new Drizzle(drizzleOptions);

const ADate = (props) => {
    const { id } = useParams();
    const [currentAccount, setCurrentAccount] = useState();
    const dater = props.dater
    const [amount, setAmount] = useState('');
    const [hasBet, setHasBet] = useState();
    const [todayBet, setTodayBet] = useState();
    const currentUser = props.currentUser
    const error = props.error
    const [date, setDate] = useState();
    const [new_bet, setBet] = useState();
    const [new_date, setNewDate] = useState();
    const [new_error, setError] = useState();

    const checkIfWalletIsConnected = async () => {
        if(!ethereum) return alert("Please install metamask.")

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        setCurrentAccount(accounts[0]);
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    });

    useEffect(() => {
        dateService.getCurrentDate(id)
        .then(response => {
            if(response.status === 200) {
                setDate(response.data.date)
                dailyBet()
            } else {
                setError(`No current date`);
            }
        })
        .catch(err => {
            console.log('ERROR', err)
        })
    })

    const dailyBet = () => {
        daterBetsService.daterHasBetsToday(date.id, currentDay(date.endedAt))
        .then(response => {
            if (response.data.status === true) {
                setTodayBet(response.data.status)
            } else {
                setTodayBet(response.data.status)
            }
        })
    }

    const getEthereumContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log({
            provider,
            signer,
            transactionContract
        })
        return transactionContract;
    }
    const sendTransaction = async (amount) => {
        try {
            const message = ''
            const keyword = ''
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            console.log('currentAccount', currentAccount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: '0x09e155E73A26A83561C123ddF63E552098E88A8e',
                    gas: '0x5208',
                    value: parsedAmount._hex
                }]
            })

            const transactionHash = await transactionContract.addToBlockchain('0x09e155E73A26A83561C123ddF63E552098E88A8e', parsedAmount, message, keyword);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            // return;

        } catch(error) {
            console.log('currentAccount', currentAccount);

            console.log('error', error)
            throw new Error('No ethereum object')
        }
    }

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

    const toBet = async (event, date_id, amount, day) => {
        const amounted = { amount: amount }
        event.preventDefault();
        await daterBetsService.daterHasBets(date_id)
        .then(async response => {
            console.log('reponse has bets', response)
            if(response.data.status === true) {
                setHasBet(response.data.status)
                await daterBetsService.update(date_id, amounted, day)
                .then(response => {
                    console.log('reponse', response)
                    sendTransaction(amount)
                    dailyBet(date_id, )
                })
                .catch(error => {
                    console.log("ERROR", error)
                })
            } else {
                console.log('no bet found for this dater');
                await daterBetsService.create(date_id, amounted, day)
                .then(response => {
                    if(response.status === 200) {
                        console.log('bet started.')
                        setBet(response.data.daterbet);
                        console.log('bet', new_bet)
                        sendTransaction(amount)
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
        <div className="shadow-lg p-3 mb-5 rounded text-center">
            {
                // If in course date
                date !== undefined
                ?
                // True
                <Fragment>
                    <h2 className="page-title">{remainingTime(date.endedAt)}</h2>

                    {
                        date.user_id === currentUser.id
                        ?
                        <Fragment>
                            <p>Date en cours !</p>
                            <button type='button' className='btn btn-secondary' disabled>Start bidate</button> 
                        </Fragment>
                        :
                        <Fragment>
                            <p>Date in progress..</p>
                            <p>Bet everyday to give your chance!</p>
                            {
                                todayBet === true
                                ?
                                <button disabled type="button" className="btn btn-warning" >Next bet tomorrow</button>
                                :
                                <DrizzleContext.Provider drizzle={drizzle}>
                                    <DrizzleContext.Consumer>
                                        { drizzleContext => {
                                        const { drizzle, drizzleState, initialized } = drizzleContext;

                                        if(!initialized) {
                                            return 'Loading...'
                                        }

                                return (
                                    <div className="input-group text-center">
                                        <form onSubmit={sendTransaction}>
                                            <input type="text" className="form-control" name={amount} placeholder="Amount (ETH)" onChange={e => setAmount(e.target.value)} />
                                            <input type="submit" value="Make a bet" className="btn btn-warning" onClick={(e) => toBet(e, date.id, amount, currentDay(date.endedAt))} />
                                        </form>
                                    </div>
                                )
                                        }}
                                    </DrizzleContext.Consumer>
                                </DrizzleContext.Provider>
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
                                <button type='button' className='btn btn-primary' onClick={startDate}>Start a bidate</button> 
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
        </div>
    )
}

export default ADate;