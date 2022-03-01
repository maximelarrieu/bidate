import './App.css';
import Greeter from './artifacts/Greeter.json';
import { DrizzleProvider } from '@drizzle/react-plugin';
import { LoadingContainer, AccountData, ContractData, ContractForm } from '@drizzle/react-components';
import { Fragment } from 'react';

const drizzleOptions = {
  contracts: [Greeter]
}

function App() {
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
}

export default App;
