import { Escola } from "./interfaces";

export const getAPIStatus =  async() => {
    const res = await fetch('http://localhost:3001/api');
    return res.status;
}
export const formatarNome = (nomeEscola: String) => {
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
    let palavras = nomeEscola.split(" ").map((palavra) => {
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