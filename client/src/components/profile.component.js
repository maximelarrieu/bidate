import React, { Fragment } from "react";
import Greeter from '../artifacts/Greeter.json';
import { DrizzleProvider } from '@drizzle/react-plugin';
import { LoadingContainer, AccountData } from '@drizzle/react-components';
import authService from "../services/auth.service";
import "../App.css";
import "../styles/profile.css";

const drizzleOptions = {
  contracts: [Greeter]
}

export default function Profile() {

  const currentUser = authService.getCurrentUser();

  return (
    <Fragment>
      <div className="container center">
        <header className="jumbotron  mt-5">
          <h3 className="page-title">
            {currentUser.username}
          </h3>
          <p>Personnalise ton profil !</p>
        </header>
        <p className="mt-5">
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
        <p>Ton compte metamask</p>
        <DrizzleProvider options={drizzleOptions}>
          <LoadingContainer>
            <AccountData accountIndex={0} units={"ether"} precision={3} />
          </LoadingContainer>
        </DrizzleProvider>
      </div>
    </Fragment>
  )
}
// export default class Profile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentUser: AuthService.getCurrentUser()
//     };
//   }
//   render() {
//     const { currentUser } = this.state;

//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h3>
//             <strong>{currentUser.username}</strong> Profile
//           </h3>
//         </header>
//         <p>
//           <strong>Token:</strong>{" "}
//           {currentUser.accessToken.substring(0, 20)} ...{" "}
//           {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
//         </p>
//         <p>
//           <strong>Id:</strong>{" "}
//           {currentUser.id}
//         </p>
//         <p>
//           <strong>Email:</strong>{" "}
//           {currentUser.email}
//         </p>
//         <strong>Authorities:</strong>
//         <ul>
//           {currentUser.roles &&
//             currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
//         </ul>
//       </div>
//     );
//   }
// }
