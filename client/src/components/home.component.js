import React, { Component } from 'react';
import UserService from "../services/user.service";
import Greeter from '../artifacts/Greeter.json';
import { DrizzleProvider } from '@drizzle/react-plugin';
import { LoadingContainer, AccountData, ContractData, ContractForm } from '@drizzle/react-components';
import { Fragment } from 'react';

const drizzleOptions = {
  contracts: [Greeter]
}

export default class Home extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         content: ""
    //     };
    // }
    // componentDidMount() {
    //     UserService.getPublicContent().then(
    //       response => {
    //         this.setState({
    //           content: response.data
    //         });
    //       },
    //       error => {
    //         this.setState({
    //           content:
    //             (error.response && error.response.data) ||
    //             error.message ||
    //             error.toString()
    //         });
    //       }
    //     );
    // }
    render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <LoadingContainer>
          <Fragment>
            <h2>Hello World !</h2>
            <h5>Mon compte :</h5>
            <AccountData accountIndex={0} units={"ether"} precision={3} />
            <h5>Ce que je récupère depuis la fonction get de mon contract Greeter :</h5>
            <ContractData contract="Greeter" method="get" />
            <h5>Je peux modifier mon contract grace à la fonction set :</h5>
            <ContractForm contract="Greeter" method="set" />
          </Fragment>
        </LoadingContainer>
      </DrizzleProvider>
    );
    // return (
    //     <div className="container">
    //       <header className="jumbotron">
    //         {/* <h3>{this.state.content}</h3> */}
    //         <h3>bonsoir</h3>
    //       </header>
    //     </div>
    //   );
  }
}
