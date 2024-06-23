import { Fragment } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { DataProvider, useMainContext } from '../context/DataContext';
import { AuthProvider } from "../context/AuthContext";
import Home from '../pages/Home';
import UserProfile from '../pages/UserProfile';
import { useAuthContext } from "../context/AuthContext";

// // Componente para rota privada
// function PrivateRoute({ element: Component, ...rest }) {
//   const { isAuthenticated } = useAuthContext();

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/home" />
//         )
//       }
//     />
//   );
// }

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/:username" element={<UserProfile />} />
          </Routes>
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  )
}

export default RoutesApp;
