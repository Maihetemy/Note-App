/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRouter from "./Components/ProtectedRouter/ProtectedRouter";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          ),
        },
        {
          path: "login",
          element: (
              <Login />
          ),
        },
        {
          path: "register",
          element: (
              <Register />
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
