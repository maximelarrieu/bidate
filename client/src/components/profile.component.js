import React, { Fragment, useEffect, useRef, useState } from "react";
import Greeter from '../artifacts/Greeter.json';
import { DrizzleProvider } from '@drizzle/react-plugin';
import { LoadingContainer, AccountData } from '@drizzle/react-components';
import authService from "../services/auth.service";
import hunterBetsService from "../services/hunterBets.service";
import daterBetsService from "../services/daterBets.service";
import { useNavigate, Link, Redirect } from "react-router-dom";
import "../App.css";
import "../styles/profile.css";
import userService from "../services/user.service";

import { Drizzle } from '@drizzle/store';
import { DrizzleContext } from '@drizzle/react-plugin';
import Transactions from '../artifacts/Transactions.json';
const { ethereum } = window;

const drizzleOptions = {
  contracts: [Greeter]
}

const drizzle = new Drizzle(drizzleOptions);

const Profile = () => {
  const [mybets, setMyBets] = useState([])
  const [error, setError] = useState('')
  let currentUser = authService.getCurrentUser();
  let user = useRef({});

  useEffect(() => {
    hunterBetsService.findAllMine()
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

  useEffect(() => {
    daterBetsService.findAllMine()
    .then(response => {
      if(response.status === 200) {
          setMyBets(response.data.daterBets)
      }
      else {
          setError(`my daterbets not found`);
      }
    })
    .catch(err => {
        console.log('err', err)
    })
  }, [mybets])

  useEffect(() => {
    userService.getUser(currentUser.id)
    .then(uuser => {
      user.current = uuser.data.dater
    })
  })

  const setUserAddress = async (e, id, address) => {
  e.preventDefault();
  await userService.setUserAddress(id, address)
    .then(response => {
      if(response.status === 200) {
        userService.getUser(currentUser.id)
        .then(user => {
          currentUser.address = user.data.dater.address
          window.document.location.reload()
        })
        
      }
    })
    .catch(err => {
      console.log('ERROR', err)
    })
  }

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-3">
          <div className="shadow-lg p-3 mb-5 rounded">
            <h2 className="page-subtitle">Compte Metamask</h2>
            <div className="mt-3">
              <DrizzleContext.Provider drizzle={drizzle}>
                <DrizzleContext.Consumer>
                    { drizzleContext => {
                    const { drizzle, drizzleState, initialized } = drizzleContext;

                    if(!initialized) {
                        return 'Loading...'
                    }

                    return (
                      <div className="mt-5">
                        <p>Register your MetaMask address</p>
                        <button className="btn btn-primary" onClick={ (e) => setUserAddress(e, currentUser.id, drizzleState.accounts[0]) }>Register</button>
                      </div>
                    )
                  }}
                </DrizzleContext.Consumer>
              </DrizzleContext.Provider>
            </div>
            <div>
            
            { 
              user.current.address === null
              ?
              <DrizzleContext.Provider drizzle={drizzle}>
                <DrizzleContext.Consumer>
                  { drizzleContext => {
                    const { drizzle, drizzleState, initialized } = drizzleContext;

                    if(!initialized) {
                        return 'Loading...'
                    }

                    return (
                      <div className="mt-5">
                        <p>{drizzleState.accounts[0]}</p>
                      </div>
                    )
                  }}
                </DrizzleContext.Consumer>
              </DrizzleContext.Provider>
              :
              <DrizzleContext.Provider drizzle={drizzle}>
                <DrizzleContext.Consumer>
                  { drizzleContext => {
                  const { drizzle, drizzleState, initialized } = drizzleContext;

                  if(!initialized) {
                      return 'Loading...'
                  }

                  return (
                    <div className="mt-5">
                      <p>Update your MetaMask address</p>
                      <button className="btn btn-outline-info" onClick={ (e) => setUserAddress(e, currentUser.id, drizzleState.accounts[0]) }>Update</button>
                    </div>
                    )
                  }}
                  </DrizzleContext.Consumer>
                </DrizzleContext.Provider>
            }
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-9 text-center">
          <header className="jumbotron">
            <h3 className="page-title">
              {currentUser.username}
            </h3>
          </header>
          <p>
            {currentUser.email}
          </p>
        </div>
      </div>
      <div>
        <h3 className="page-subtitle">My bets in progress</h3>
        {
          currentUser.type_id === 2
          ?
          <div className="row mt-2">
            {
              mybets.length > 0
              ?
              mybets.map((bet, index) => {
                return (
                  <div className="col-sm-12 col-md-6 col-lg-3">
                    <a href={'/todate/' + bet.dateb.user_id}>
                    <div key={index} className="card">
                      <div className="card-header">
                        {bet.dateb.id}
                      </div>
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
                        <p>on - {bet.userb.username}</p>
                      </div>
                    </div>
                    </a>
                  </div>
                )
              })
              :
              <p>{error}</p>
            }
          </div>
          :
          <div className="row mt-2">
            {
              mybets.length > 0
              ?
              mybets.map((bet, index) => {
                return (
                  <div className="col-sm-12 col-md-6 col-lg-3">
                    <a href={'/todate/' + bet.dateb.user_id}>
                    <div key={index} className="card">
                      <div className="card-header">
                        {bet.dateb.id}
                      </div>
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
                        <p>on - {bet.dateb.user.username}</p>
                      </div>
                    </div>
                    </a>
                  </div>
                )
              })
              :
              <p>{error}</p>
            }
          </div>
        }
      </div>
    </div>

  )
}

export default Profile;
