import { Escola, Item } from "./interfaces";

export const getAPIStatus = async () => {
  const res = await fetch("http://localhost:3001/api");
  return res.status;
};

export function dataRelativa(dataISO: string): string {
  const dataFornecida = new Date(dataISO);
  const dataAtual = new Date();

  const segundos = Math.floor(
    (dataAtual.getTime() - dataFornecida.getTime()) / 1000
  );
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const semanas = Math.floor(dias / 7);
  const meses = Math.floor(dias / 30); // Aproximação de meses
  const anos = Math.floor(dias / 365); // Aproximação de anos

  if (segundos < 60) {
    return "Há poucos segundos";
  } else if (minutos < 60) {
    return `Há ${minutos} minuto${minutos > 1 ? "s" : ""}`;
  } else if (horas < 24) {
    return `Há ${horas} hora${horas > 1 ? "s" : ""}`;
  } else if (dias < 2) {
    return `Ontem`;
  } else if (dias < 3) {
    return `Anteontem`;
  } else if (semanas < 2) {
    return `Há ${dias} dia${dias > 1 ? "s" : ""}`;
  } else if (meses < 12) {
    return `Há ${semanas} semana${semanas > 1 ? "s" : ""}`;
  } else if (anos < 2) {
    return `Há ${meses} mês${meses > 1 ? "es" : ""}`;
  } else {
    return `Há ${anos} ano${anos > 1 ? "s" : ""}`;
  }
}

export function formatarNumeroTelefone(numeroTelefone: string) {
  if (
    numeroTelefone === null ||
    numeroTelefone === undefined ||
    numeroTelefone === ""
  ) {
    return "";
  }

  const limpo = numeroTelefone.replace(/\D/g, "");

  if (limpo === "") {
    return "";
  }

  if (limpo.length === 8) {
    return limpo.replace(/(\d{4})(\d{4})/, "$1-$2");
  }

  if (limpo.length === 9) {
    return limpo.replace(/(\d{5})(\d{4})/, "$1-$2");
  }

  return limpo;
}

export const converterEscolas = (escolas: Escola[]): Item[] => {
  return escolas.map(({ inep_id, nome }) => ({
    id: inep_id,
    name: formatarNome(nome),
  }));
};

export const checarAutenticação = async () => {
  return await fetch("/api/checkAutenticado").then(async (res: Response) => {
    return await res.json();
  });
};

export const carregarEscolas = async () => {
  return await fetch("/api/escolas")
    .then(async (res: Response) => {
      const data: Escola[] = await res.json();
      return data;
    })
    .catch((e) => {
      throw new Response(e);
    });
};

export const procurarEscola = async (nome: string, escolas?: Escola[]) => {
  if (escolas === undefined) {
    escolas = await carregarEscolas();
  }
  for (const escola of escolas) {
    if (formatarNome(nome) === formatarNome(escola.nome)) {
      return escola;
    }
  }
  return null;
};

export const formatarNome = (nome: String) => {
  if (nome === null || nome === undefined) {
    return "";
  }
  let siglas: String[] = [
    "EEMTI",
    "EEEP",
    "CEM",
    "EEM",
    "EEF",
    "CEI",
    "ARA",
    "EEBM",
    "II",
  ];
  let palavras = nome.split(" ").map((palavra) => {
    if (siglas.includes(palavra)) {
      return palavra;
    } else {
      return palavra.slice(0, 1) + palavra.toLowerCase().slice(1);
    }
  });
  return palavras.join(" ");
};

export const formatar = (escola: Escola) => {
  return (
    <div>
      <h2>{formatarNome(escola.nome)}</h2>
    </div>
  );
};
