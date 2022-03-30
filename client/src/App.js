import './App.css';
import React from 'react';
// import theme from "./theme";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes as Switch, Route, Link } from "react-router-dom";
import { history } from "./helpers/history";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import Daters from './components/daters.component';
import Dater from "./components/dater.component";

export default function App() {


  return (
    <ChakraProvider>
      <Router history={history}>
        <Switch>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/todate" element={<Daters />} />
          <Route exact path="/todate/:id" element={<Dater />} />
        </Switch>
      </Router>
    </ChakraProvider>
  )
}
// class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.logOut = this.logOut.bind(this);
  //   this.state = {
  //     showModeratorBoard: false,
  //     showAdminBoard: false,
  //     currentUser: undefined,
  //   };
  // }
  // componentDidMount() {
  //   const user = AuthService.getCurrentUser();
  //   if (user) {
  //     this.setState({
  //       currentUser: user,
  //       showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
  //       showAdminBoard: user.roles.includes("ROLE_ADMIN"),
  //     });
  //   }
  // }
  // logOut() {
  //   AuthService.logout();
  // }
  // render() {
    // const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    // return (
      // <div>
      //   <nav className="navbar navbar-expand navbar-dark bg-dark">
      //     <Link to={"/"} className="navbar-brand">
      //       bezKoder
      //     </Link>
      //     <div className="navbar-nav mr-auto">
      //       <li className="nav-item">
      //         <Link to={"/home"} className="nav-link">
      //           Home
      //         </Link>
      //       </li>
      //       {showModeratorBoard && (
      //         <li className="nav-item">
      //           <Link to={"/mod"} className="nav-link">
      //             Moderator Board
      //           </Link>
      //         </li>
      //       )}
      //       {showAdminBoard && (
      //         <li className="nav-item">
      //           <Link to={"/admin"} className="nav-link">
      //             Admin Board
      //           </Link>
      //         </li>
      //       )}
      //       {currentUser && (
      //         <li className="nav-item">
      //           <Link to={"/user"} className="nav-link">
      //             User
      //           </Link>
      //         </li>
      //       )}
      //     </div>
      //     {currentUser ? (
      //       <div className="navbar-nav ml-auto">
      //         <li className="nav-item">
      //           <Link to={"/profile"} className="nav-link">
      //             {currentUser.username}
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <a href="/login" className="nav-link" onClick={this.logOut}>
      //             LogOut
      //           </a>
      //         </li>
      //       </div>
      //     ) : (
      //       <div className="navbar-nav ml-auto">
      //         <li className="nav-item">
      //           <Link to={"/login"} className="nav-link">
      //             Login
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link to={"/register"} className="nav-link">
      //             Sign Up
      //           </Link>
      //         </li>
      //       </div>
      //     )}
      //   </nav>
      //   <div className="container mt-3">

//     //     </div>
//     //   </div>
//     );
//   }
// }
// export default App;
