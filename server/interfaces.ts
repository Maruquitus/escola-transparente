import { Request } from "express";
import { ObjectId } from "mongodb";

export interface UsuárioAutenticado {
  id: ObjectId;
  usuário: string;
}

export interface RequestAutenticado extends Request {
  login: Function;
  logOut: Function;
  logout: Function;
  isAuthenticated: Function;
  user: UsuárioAutenticado;
  files?: Express.Multer.File[];
}

export interface Escola {
  inep_id: number;
  cidade_id: number | null;
  estado_id: number | null;
  dependencia_id: number | null;
  dependencia: string | null;
  localizacao_id: number | null;
  localizacao: string | null;
  situacao_funcionamento_id: number | null;
  situacao_funcionamento: string | null;
  nome: string;
  nome_prefixo: string | null;
  nome_padronizado: string | null;
  slug: string | null;
  bairro: string | null;
  endereco: string | null;
  cep: string | null;
  ddd: string | null;
  telefone: string | null;
  telefone_publico: string | null;
  email: string | null;
  lat: number | null;
  long: number | null;
}
