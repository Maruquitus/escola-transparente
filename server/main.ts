import { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/AuthRoutes";
import escolaRoutes from "./routes/EscolaRoutes";
import fileRoutes from "./routes/FileRoutes";
import reclamaçãoRoutes from "./routes/ReclamaçãoRoutes";
import usuárioRoutes from "./routes/UsuárioRoutes";
import { run } from "./config/db";
import { UsuárioAutenticado } from "./interfaces";
import { autenticarUsuário } from "./services/AuthService";

/*===========IMPORTS===========*/
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
export const app = express();
export var passport = require("passport");
const session = require("express-session");
var LocalStrategy = require("passport-local");

/*===========CONFIGURAÇÕES INICIAIS===========*/
//Inicializar a bd
run();

//Usar o body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Autenticação

app.use(passport.initialize());

//Configurar session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.authenticate("session"));

//Setup de autenticação
passport.use(
  new LocalStrategy(async function verify(
    username: string,
    password: string,
    cb: Function
  ) {
    const resultado = await autenticarUsuário(username, password);
    if (resultado instanceof Error) {
      return cb(null, false, { message: resultado.message });
    } else {
      return cb(null, {
        id: resultado._id,
        usuário: resultado.usuário,
      } as UsuárioAutenticado);
    }
  })
);

//Serialização e deserialização
passport.serializeUser(function (user: UsuárioAutenticado, cb: Function) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.usuário });
  });
});

passport.deserializeUser(function (user: UsuárioAutenticado, cb: Function) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

/*===========CORS===========*/
const origensPermitidas = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://escola-transparente.onrender.com",
];
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string;

  if (origensPermitidas.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
});

const port = 3001;
app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);
});

/*===========Rotas===========*/
app.use("/", authRoutes);
app.use("/", escolaRoutes);
app.use("/", fileRoutes);
app.use("/", reclamaçãoRoutes);
app.use("/", usuárioRoutes);

// Fazer com que o Node sirva os arquivos do app em React criado
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Todas as outras solicitações GET não tratadas retornarão o app em React
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
