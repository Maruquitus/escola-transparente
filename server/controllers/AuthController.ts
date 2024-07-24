import { NextFunction, Response } from "express";
import { RequestAutenticado } from "../interfaces";

const passport = require("passport");

export const autenticar = (
  req: RequestAutenticado,
  res: Response,
  next: NextFunction
) => {
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
};

export const logout = async (req: RequestAutenticado, res: Response) => {
  req.logOut((erro: Error) => {
    if (erro) res.status(500).send({ message: "Não foi possível sair" });
    else {
      res.status(200).send({ message: "Saída feita com sucesso" });
    }
  });
};

export const checkAutenticado = async (
  req: RequestAutenticado,
  res: Response
) => {
  if (!req.user) res.status(200).send([false, null]);
  else res.status(200).send([req.isAuthenticated(), req.user]);
};
