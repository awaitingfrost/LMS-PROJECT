// // AdminRoute.js
// import React from 'react';
// import { Route, redirect } from 'react-router-dom';

// const AdminRoute = ({ component: Component, user, ...rest }) => {

//   return (

//     <Route
//       {...rest}
//       render={(props) =>
//         user && user.isAdmin ? (
//           <Component {...props} />
//         ) : (
//           <redirect to="/signin" />
//         )
//       }
//     />
//   );
// }

// export default AdminRoute;
