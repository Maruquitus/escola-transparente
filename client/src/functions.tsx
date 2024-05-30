import { Escola, Item } from "./interfaces";

export const getAPIStatus =  async() => {
    const res = await fetch('http://localhost:3001/api');
    return res.status;
}

export function formatarNumeroTelefone(numeroTelefone: string) {
  if (numeroTelefone === null || numeroTelefone === undefined || numeroTelefone === '') {
    return '';
  }

  const limpo = numeroTelefone.replace(/\D/g, '');

  if (limpo === '') {
    return '';
  }

  return limpo.replace(/(\d{5})(\d{4})/, '$1-$2');
}

export const converterEscolas = (escolas: Escola[]): Item[] => {
  return escolas.map(({inep_id, nome}) => ({id: inep_id, name: formatarNome(nome)}))
}

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

export const procurarEscola = (nome: string, escolas: Escola[]) => {
  for (const escola of escolas) {
    if (nome === formatarNome(escola.nome)) {
      return escola;
    }
  }
  return null;
}

export const formatarNome = (nome: String) => {
  if (nome === null || nome === undefined) {
    return '';
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