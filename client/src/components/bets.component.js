import React, { Fragment, useEffect, useState } from "react";
import { ethers } from 'ethers';
import { contractABI, contractAddress } from "../helpers/constants";
import { currentDay } from "../helpers/currentDay";
import authService from "../services/auth.service";
import daterBetsService from "../services/daterBets.service";
import hunterBetsService from "../services/hunterBets.service";
import HunterBets from "./hunterBets.component";

import { Drizzle } from '@drizzle/store';
import { DrizzleContext } from '@drizzle/react-plugin';
import Greeter from '../artifacts/Greeter.json';
import Transactions from '../artifacts/Transactions.json';
const { ethereum } = window;

const drizzleOptions = {
  contracts: [Greeter, Transactions]
}

const drizzle = new Drizzle(drizzleOptions);

const Bets = (props) => {
    const formData = useState();
    const date = props.date
    const [amount, setAmount] = useState('');
    const [currentAccount, setCurrentAccount] = useState();
    const [bets, setBets] = useState([]);
    const [bet, setBet] = useState();
    const [daterBetToday, setDaterBetToday] = useState();
    const [error, setError] = useState();
    const currentUser = authService.getCurrentUser();

    const checkIfWalletIsConnected = async () => {
        if(!ethereum) return alert("Please install metamask.")

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        setCurrentAccount(accounts[0]);
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    });
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

    // const checkDaterBetToday = async (date_id, dater_id, day) => {
    //     return await hunterBetsService.hunterHasBetsOnDaterToday(date_id, dater_id, day)
    //     .then(async response => {
    //         console.log('status', response.data.status)
    //         if (response.data.status === true) {
    //             console.log('OK')
    //             await setDaterBetToday(response.data.status)
    //             return true
    //         } else {
    //             await setDaterBetToday(response.data.status)
    //             return false
    //         }
    //     })
    // }
    
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
    }, [bets])

    const betOnDater = async (event, dater_id, date_id, amount, day) => {
        const amounted = { amount: amount }
        event.preventDefault();
        await hunterBetsService.hunterHasBetOnDate(date_id, dater_id)
        .then(async response => {
            console.log('has previous bets on this dater')
            if(response.data.status === true) {
                await hunterBetsService.update(dater_id, date_id, amounted, day)
                .then(response => {
                    console.log('hunter bet updated')
                    console.log(response)
                    console.log('send transac')
                    sendTransaction(amount)
                })
                .catch(error => {
                    console.log("ERROR:", error)
                })
            } else {
                await hunterBetsService.create(dater_id, date_id, amounted, day)
                .then(response => {
                    if(response.status === 200) {
                        console.log('hunter bet started.')
                        setBet(response.data.hunterbet);
                        console.log('bet', bet)
                        console.log('send transac')
                        sendTransaction(amount)
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
        <DrizzleContext.Provider drizzle={drizzle}>
            <DrizzleContext.Consumer>
                { drizzleContext => {
                const { drizzle, drizzleState, initialized } = drizzleContext;

                if(!initialized) {
                    return 'Loading...'
                }

          return (
            <div className="container mt-5">
                <h3 className="page-subtitle">Bets in progress</h3>
                <div className="table-responsive mt-2">
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
                                                    <button className="btn btn-sm btn-success" disabled>Bet on</button>
                                                    :
                                                    <form onSubmit={sendTransaction}>
                                                        <div class="row g-3 align-items-center">
                                                            <div class="col-auto">
                                                                <input type="text" value={bet.amount} className="form-control" onChange={e => setAmount(e.target.value)} />
                                                            </div>
                                                            <div class="col-auto">
                                                                <input type="submit" value="Bet on" placeholder="Amount (ETH)" className="btn btn-success" onClick={ (e) => betOnDater(e, bet.userb.id, date.id, amount, currentDay(date.endedAt)) } />
                                                            </div>
                                                        </div>
                                                    </form>
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
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                            </tr>

                        }
                        </tbody>
                    </table>
                </div>
                <HunterBets date={date} />
            </div>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
    )
}

export default Bets;