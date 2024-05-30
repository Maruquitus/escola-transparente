import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Landing from "./pages/Landing";
import Erro404 from "./pages/404";
import Erro from "./pages/Erro";
import Pesquisa from "./pages/Pesquisa";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import PáginaEscola from "./pages/Escola";
import { Loader } from "./components/Loader";
import Home from "./pages/Home";
import { checarAutenticação, carregarEscolas } from "./functions";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <Erro />,
    loader: carregarEscolas,
  },
  {
    path: "/pesquisa",
    element: <Pesquisa />,
    errorElement: <Erro />,
    loader: carregarEscolas,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Erro />,
    loader: checarAutenticação,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
    errorElement: <Erro />,
    loader: checarAutenticação,
  },
  {
    path: "/escola",
    element: <PáginaEscola />,
    errorElement: <Erro />,
    loader: checarAutenticação,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <Erro />,
    loader: checarAutenticação,
  },
  {
    path: "*",
    element: <Erro404 />,
    errorElement: <Erro />,
    loader: checarAutenticação,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider fallbackElement={<Loader />} router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
