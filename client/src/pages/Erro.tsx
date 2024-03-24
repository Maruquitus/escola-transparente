import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import SVG from "../assets/erro.svg"
import { FC } from "react";
import { useRouteError } from "react-router-dom";
interface ErrorType {
  status: string,
  statusText: string,
  data: string,
  internal: boolean,

}

const Erro: FC<{}> = () => {
  const erro = useRouteError() as ErrorType;
  return (
    <div className="w-full h-full flex-col flex">
      <Header/>
      <div className="">
        <img alt='' className="w-8/12 sm:w-6/12 md:w-5/12 lg:w-4/12 mt-12 mx-auto" src={SVG}/>
        <h1 className="text-center text-gray-800 font-semibold mt-2 font-sans scale-75 sm:scale-90 md:scale-100 text-2xl">Ops! Algo inesperado aconteceu!</h1>
        <h1 className="text-center text-gray-600 font-medium mt-0 md:mt-2 font-sans scale-75 sm:scale-90 md:scale-100 text-xl">Clique <Link className="text-blue-500 font-sans font-semibold hover:scale-105 duration-150" to='/'>aqui</Link> para voltar ao início</h1>
        {erro.data && <h1 className="text-center text-gray-600 font-medium mt-0 md:mt-2 font-sans scale-75 sm:scale-90 md:scale-100 text-xl">Erro: {erro.data}</h1>}
      </div>
    </div>
  );
}

export default Erro;
