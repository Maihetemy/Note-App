/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRouter from "./Components/ProtectedRouter/ProtectedRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TokenContextProvider from "./Context/TokenContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ModalOpeningProvider from "./Context/ModalOpening";
function App() {
  const queryClient = new QueryClient();
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
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ModalOpeningProvider>
          <TokenContextProvider>
            <RouterProvider router={routes}></RouterProvider>
            <ReactQueryDevtools />
          </TokenContextProvider>
        </ModalOpeningProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
