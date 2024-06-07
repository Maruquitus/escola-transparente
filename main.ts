import { Request, Response, NextFunction } from "express";
import {
  novoUsuário,
  autenticarUsuário,
  novaReclamação,
  limparReclamações,
  limparImagens,
  mostrarReclamações,
  getReclamaçõesEscola,
  curtir,
  descurtir,
  checkCurtida,
} from "./db";
import { download, uploadFiles, getListFiles } from "./upload";
import { Escola } from "./client/src/interfaces";
import axios from "axios";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import multer from "multer";

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

// Upload e download de arquivos
app.post("/upload", uploadFiles);
app.get("/arquivos/:name", download);

// Checar se a reclamação já foi curtida pelo usuário
app.get(
  "/api/curtido/:reclamacaoid",
  async (req: RequestAutenticado, res: Response) => {
    if (!req.user || !req.params.reclamacaoid) res.status(400).end();
    if (req.user) {
      const curtido = await checkCurtida(
        new ObjectId(req.user.id),
        new ObjectId(req.params.reclamacaoid)
      );
      res.status(200).json(curtido);
    }
  }
);

// Curtir e descurtir
app.post(
  "/api/curtir/:reclamacaoid",
  async (req: RequestAutenticado, res: Response) => {
    if (!req.user || !req.params.reclamacaoid) res.status(400).end();
    if (req.user) {
      curtir(new ObjectId(req.user.id), new ObjectId(req.params.reclamacaoid));
      res.status(200).end();
    }

    // Validar autenticação do usuário e criar uma lista na bd das curtidas - quem deu e onde deu (lá ele)
    // Talvez fazer uma coleção só de curtidas. Parece pertinente
    // Pegar as variáveis não usadas e trocar por _ pra ficar bonitinho
    // Unrelated: adicionar barra de pesquisa na página das escolas tbm (talvez deixar o get das escolas no componente de search, sla)
  }
);

app.post(
  "/api/descurtir/:reclamacaoid",
  async (req: RequestAutenticado, res: Response) => {
    if (!req.user || !req.params.reclamacaoid) res.status(400).end();
    if (req.user) {
      descurtir(
        new ObjectId(req.user.id),
        new ObjectId(req.params.reclamacaoid)
      );
      res.status(200).end();
    }
  }
);

// Pegar reclamações de uma escola específica
app.get(
  "/api/reclamacoes/:cidadeId/:escola",
  async (req: Request, res: Response) => {
    const resultado = await getReclamaçõesEscola(
      req.params.escola,
      parseInt(req.params.cidadeId)
    );
    if (resultado instanceof Error) {
      res.status(500).send({ mensagem: "Erro ao carregar as reclamações!" });
    } else {
      res.status(200).json(resultado);
    }
  }
);

// Endpoints de debug
if (process.env.IS_PRODUCTION == "false") {
  // Mostrar todas as reclamações
  app.get("/api/listreclamacoes", async (req: Request, res: Response) => {
    const resultado = await mostrarReclamações();
    if (resultado instanceof Error) {
      res.status(500).send({ mensagem: "Erro ao carregar as reclamações!" });
    } else {
      res.status(200).json(resultado);
    }
  });
  app.post("/api/limparReclamacoes", async (req: Request, res: Response) => {
    await limparReclamações();
    res.status(200).send({ mensagem: "Reclamações limpas!" });
  });
  app.post("/api/limparImagens", async (req: Request, res: Response) => {
    await limparImagens();
    res.status(200).send({ mensagem: "Imagens limpas!" });
  });
  app.get("/arquivos", getListFiles);
}

// Lidar com as solicitações GET feitas à rota /api/escolas
app.get("/api/escolas", async (req: Request, res: Response) => {
  let dados: Escola[] = await getEscolas();
  res.json(dados);
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Nova reclamação
app.post(
  "/api/novaReclamacao",
  upload.array("fotos", 3),
  async (req: Request, res: Response) => {
    try {
      const [escola, título, textoReclamacao] = [
        req.body.escola,
        req.body.titulo,
        req.body.texto,
      ];
      let fotos: string[] = [];

      if (Array.isArray(req.files) && req.files.length) {
        // Processar cada arquivo enviado
        for (const file of req.files) {
          const formData = new FormData();
          formData.append(
            `file`,
            new Blob([file.buffer], { type: file.mimetype })
          );

          // Enviar o arquivo para o servidor de upload
          const response = await fetch("http://localhost:3001/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error((await response.json()).message);
          }
          const res = await response.json();
          fotos.push(res.filename);
        }
      }

      if (escola && textoReclamacao && título) {
        //Adicionar checagem de limite de caracteres
        const resultado = await novaReclamação(
          escola,
          título,
          textoReclamacao,
          fotos
        );
        if (resultado instanceof Error) {
          return res
            .status(400)
            .send("Erro ao fazer a reclamação! Tente novamente.");
        }
        return res.status(200).send("Reclamação feita com sucesso!");
      } else {
        return res
          .status(400)
          .send("Preencha o formulário por completo e tente de novo.");
      }
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
);

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
app.get(
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
