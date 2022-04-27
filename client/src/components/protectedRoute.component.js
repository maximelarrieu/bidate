import { Navigate } from 'react-router-dom';
import authService from "../services/auth.service";

const ProtectedRoute = ({Component}) => {
    const currentUser = authService.getCurrentUser();

    return currentUser ? <Component /> : <Navigate to="/login" />
}

export default ProtectedRoute

// import React, { Component } from 'react';
// import { Switch, Route, Navigate } from 'react-router-dom';
// import authService from "../services/auth.service";

// class ProtectedRoute extends Component {
//     render() {
//       const currentUser = authService.getCurrentUser();
//       const { component: Component, ...props } = this.props
  
//       return (
//         <Route 
//           {...props} 
//           render={props => (
//             currentUser ?
//               <Component {...props} /> :
//               <Navigate to='/login' />
//           )} 
//         />
//       )
//     }
// }

// export default ProtectedRoute;
  
// //   class AllRoutes extends Component {
// //     render() {
// //       return (
// //         <Switch>
// //           <Route path='/login' component={Login} />
// //           <ProtectedRoute path='/welcome' component={Welcome} />
// //         </Switch>
// //       )
// //     }
// //   }
