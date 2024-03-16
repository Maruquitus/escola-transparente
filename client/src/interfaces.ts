export interface Escola {
    inep_id: number;
    cidade_id: number;
    estado_id: number;
    dependencia_id: number;
    dependencia: string;
    localizacao_id: number;
    localizacao: string;
    situacao_funcionamento_id: number;
    situacao_funcionamento: string;
    nome: string;
    nome_prefixo: string;
    nome_padronizado: string;
    slug: string;
    bairro: string;
    endereco: string;
    cep: string;
    ddd: string;
    telefone: string;
    telefone_publico: string;
    email: string;
    lat: number;
    long: number;
  }