import React, { Fragment, useEffect, useRef, useState } from "react";
import Greeter from '../artifacts/Greeter.json';
import { DrizzleProvider } from '@drizzle/react-plugin';
import { LoadingContainer, AccountData } from '@drizzle/react-components';
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
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
  let currentUser = authService.getCurrentUser();
  let user = useRef({});
  let navigate = useNavigate(); 


  useEffect(() => {
    userService.getUser(currentUser.id)
    .then(uuser => {
      user.current = uuser.data.dater
    })
  })

  const routeChange = () => { 
    let path = `/todate/${currentUser.id}`; 
    navigate(path);
  }

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
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
          { drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if(!initialized) {
              return 'Loading...'
          }

          return (
            <div className="mt-5">
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <div className="shadow-lg p-3 mb-5 rounded">
                    <h2 className="page-subtitle">Compte Metamask</h2>
                    <div className="mt-3">
                      <DrizzleProvider options={drizzleOptions}>
                        <LoadingContainer>
                          <AccountData accountIndex={0} units={"ether"} precision={3} />
                        </LoadingContainer>
                      </DrizzleProvider>
                    </div>
                    
                    { 
                      user.current.address === null
                      ?
                      <div className="mt-5">
                        <p>Register your MetaMask address</p>
                        <button className="btn btn-primary" onClick={ (e) => setUserAddress(e, currentUser.id, drizzleState.accounts[0]) }>Register</button>
                      </div>
                      :
                      <div className="mt-5">
                        <p>Update your MetaMask address</p>
                        <button className="btn btn-outline-info" onClick={ (e) => setUserAddress(e, currentUser.id, drizzleState.accounts[0]) }>Update</button>
                      </div>
                    }
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-9 text-center">
                  <header className="jumbotron">
                    <h3 className="page-title">
                      {currentUser.username}
                    </h3>
                    <p>Personnalise ton profil !</p>
                  </header>
                  <button className="btn btn-success" onClick={routeChange}>Go to start a bidate</button>
                  <p>
                    <strong>Token:</strong>{" "}
                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                  </p>
                  <p>
                    <strong>Id:</strong>{" "}
                    {currentUser.id}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {currentUser.email}
                  </p>
                  <strong>Authorities:</strong>
                  <ul>
                    {currentUser.roles &&
                      currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                  </ul>
                </div>
              </div>
              
            </div>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  )
}

export default Profile;
