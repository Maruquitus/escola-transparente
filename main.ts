import { Request, Response, NextFunction } from "express";
import { contarDocs, novoUsuário, getUsuário, autenticarUsuário } from "./db";
import { Escola } from "./client/src/interfaces";
import axios from "axios";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { verify } from "crypto";

/*===========IMPORTS===========*/
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local");

/*===========CONFIGURAÇÕES INICIAIS===========*/
//Ler o dotenv
dotenv.config();

//Usar o body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Usar o passport
app.use(passport.initialize());

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

// Fazer com que o Node sirva os arquivos do app em React criado
app.use(express.static(path.resolve(__dirname, "./client/build")));

/*===========FUNÇÕES DA API===========*/
const api = process.env.API_QEDU as string;

async function getEscola(codigo_inep: string, nome: string): Promise<Escola> {
  const url = "https://api.qedu.org.br/v1/escolas/";
  const headers = {
    Authorization: `Bearer ${api}`,
    "Content-Type": "application/json",
  };

  const dados = {
    inep_id: codigo_inep,
  };

  const response = await axios.get(url, { params: dados, headers, timeout: 1 });
  return response.data as Escola;
}

async function getEscolas(tentativas: number = 3): Promise<Escola[]> {
  const url = "http://api.qedu.org.br/v1/escolas/";
  const headers = {
    Authorization: `Bearer ${api}`,
    "Content-Type": "application/json",
  };
  const dados = {
    cidade_id: 2303501,
  };

  let tentativa = 0;
  while (tentativa < tentativas) {
    try {
      const response = await axios.get(url, { params: dados, headers });
      return response.data["data"] as Escola[];
    } catch (error: any) {
      if (error.code === "ETIMEDOUT" && tentativa < tentativas - 1) {
        console.log(`Request deu TimeOut, Tentativas ${tentativa + 1}`);
        tentativa++;
        continue;
      }
      throw error;
    }
  }

  throw Error("Número de tentativas de request à API atingido.");
}

/*===========AUTENTICAÇÃO===========*/
interface UsuárioAutenticado {
  id: ObjectId;
  usuário: string;
}

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

/*===========ROTAS===========*/
interface RequestAutenticado extends Request {
  login: Function;
  logOut: Function;
  logout: Function;
  isAuthenticated: Function;
  user: UsuárioAutenticado;
}

// Autenticação
app.post(
  "/login/autenticar",
  (req: RequestAutenticado, res: Response, next: NextFunction) => {
    passport.authenticate("local", (erro: Error, usuário: any, info: any) => {
      if (usuário) {
        req.login(usuário, (erro: Error) => {
          if (erro) return res.redirect(`/login?erro=${erro.message}`);
          else return res.redirect("/home");
        });
      } else {
        res.redirect(`/login?erro=${info.message}`);
      }
    })(req, res, next);
  }
);

// Lidar com as solicitações POST feitas à rota /api/escolas
app.post("/api/escolas", async (req: Request, res: Response) => {
  let dados: Escola[] = await getEscolas();
  res.json(dados);
});

//Nova reclamação
app.post("/api/novaReclamacao", async (req: Request, res: Response) => {
  res.redirect("/");
});

// Novo usuário
app.post("/api/novoUsuario", async (req: Request, res: Response) => {
  let resultado;
  if (req.body.confirmPassword !== req.body.password)
    resultado = Error("Confirmação de senha incorreta. Tente novamente.");
  if (!resultado && req.body.password.length < 8)
    resultado = Error("Senha muito curta! Mínimo de 8 caracteres.");
  if (!resultado)
    resultado = await novoUsuário(req.body.username, req.body.password);
  if (resultado instanceof Error) {
    res.redirect(`/cadastro?erro=${resultado.message}`);
  } else {
    res.redirect("/home");
  }
});

//Logout
app.post("/api/sair", async (req: RequestAutenticado, res: Response) => {
  req.logOut((erro: Error) => {
    if (erro) res.status(500).send({ message: "Não foi possível sair" });
    else {
      res.status(200).send({ message: "Saída feita com sucesso" });
    }
  });
});

//Checar autenticação
app.post(
  "/api/checkAutenticado",
  async (req: RequestAutenticado, res: Response) => {
    if (!req.user) res.status(200).send([false, null]);
    else res.status(200).send([req.isAuthenticated(), req.user]);
  }
);

// Todas as outras solicitações GET não tratadas retornarão o app em React
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
