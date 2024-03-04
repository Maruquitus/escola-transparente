import React from "react";
import { Header } from "../components/Header";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

interface Escola {
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

function Index() {
  const [escolas, setEscolas] = React.useState<Escola[]>([])
  React.useEffect(() => {
    fetch('/api').then(async (res: Response) => {
      const data: Escola[] = await res.json();
      setEscolas(data)
    })
  }, [])

  const formatarNome = (nomeEscola: String) => {
    let siglas: String[] = ["EEMTI", "EEEP", "CEM", "EEM", "EEF", "CEI", "ARA", "EEBM"];
    let palavras = nomeEscola.split(' ').map((palavra) => {
      if(siglas.includes(palavra)) {
        return palavra;
      } else {
        return palavra.slice(0, 1) + palavra.toLowerCase().slice(1);
      }
    })
    return palavras.join(' ');
  }

  const formatar = (escola: Escola) => {
    return (
      <div>
        <h2>{formatarNome(escola.nome)}</h2>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex-col flex">
      <Header>
        {/* Pesquisa desktop */}
        <div className="place-content-around w-4/5 flex h-10 invisible md:visible">
          <form autoComplete="off" className="w-full">
            <div className="items-center md:visible">
              <ReactSearchAutocomplete showNoResultsText="Escola não encontrada." className="self-center mt-10 w-full md:w-4/5 md:mt-0 mx-auto" items={escolas} fuseOptions={{"keys": ['nome']}} onSelect={() => {}} onSearch={() => {}} formatResult={formatar}/>
            </div>
          </form> 
        </div>
        
      </Header>

      <main className="block h-full w-full">
        {/* Parte inicial */}
        <div className="md:flex block">
          <div className="md:w-4/5 w-full">
            <h1 className="text-6xl ml-6 mt-32 font-bold font-sans text-gray-900">
              Seja bem-vindo ao <br className="md:inline hidden" /> Escola{" "}
              <span className="font-bold font-sans text-blue-500">
                transparente
              </span>
              !
            </h1>
            <h2 className="text-xl ml-6 mt-2 font-normal text-gray-500">
              Insatisfeito com a infraestrutura de sua escola? Reclame agora
              mesmo!
            </h2>
            <button className="h-10 w-48 ml-6 mt-4 bg-blue-500 font-sans hover:bg-blue-600 duration-300 font-semibold rounded-md text-white">
              Nova reclamação
            </button>
          </div>
          <div className="w-full h-full md:1/4 py-9 select-none">
            <img alt="Estudantes" className="z-0 select-none" src="imagem.jpg" />
          </div>
        </div>
        <div>
        </div>
      </main>
      <footer className="bottom-1 text-center invisible w-full">
        <a
          className="text-center w-full text-gray-500 font-medium font-sans"
          href="https://br.freepik.com/vetores-gratis/alunos-aprendendo-lingua-estrangeira-com-vocabulario_11235885.htm"
        >
          Imagem de pch.vector no Freepik
        </a>
      </footer>
    </div>
  );
}

export default Index;
