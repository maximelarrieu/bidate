import React, { Component, Fragment } from "react";
import { ReactNode } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import authService from "../services/auth.service";
import ConnectButton from "./connectButton.component";
import AccountModal from "./accountModal.component";
// type Props = {
//   children?: ReactNode;
// };

export default function Profile({ children }) {

  const currentUser = authService.getCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="100vh"
        bg="gray.800"
      >
        <div className="container" style={{color: 'white'}}>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
          </header>
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
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </Flex>
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
