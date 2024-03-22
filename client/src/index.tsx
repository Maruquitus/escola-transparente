import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Landing from "./pages/Landing";
import Erro404 from "./pages/404";
import Error from "./pages/Error";
import Search from "./pages/Search";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Escola } from "./interfaces";


const carregarEscolas = async () => {  
    return await fetch("/api/escolas", {method: "POST"})
        .then(async (res: Response) => {
          const data: Escola[] = await res.json();
          return data;
        })
        .catch((e) => {
          throw new Response(e);
        });      
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <Error />,
    loader: carregarEscolas,
    },
  {
    path: "/search",
    element: <Search />,
    errorElement: <Error />,
    loader: carregarEscolas,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
  {
    path: "*",
    element: <Erro404 />,
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
