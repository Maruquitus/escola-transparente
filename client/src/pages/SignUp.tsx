import { Header } from "../components/Header";
import { MobileNav } from "../components/MobileNav";
import SVG from "../assets/signup.svg";


export default function SignUp() {
    return (
        <div>
            <Header/>
            <main className="flex">
        <div className="w-full sm:w-2/5 my-auto">
          <div className="self-center p-4 grid mx-auto mt-20 sm:ml-8">
            <h1 className="text-slate-900 font-sans font-bold text-2xl text-center">
              Seja bem vindo! Insira suas informações.
            </h1>
            <form className="space-y-3">
              <div className="w-full row grid">
                <label className="text-gray-500 font-sans font-medium">Email</label>
                <input
                  required
                  id="email"
                  className="text-black font-sans h-8 bg-slate-100 shadow-sm rounded-md outline-0 font-medium p-1"
                  type="text"
                />
              </div>
              <div className="w-full row grid">
                <label className="text-gray-500 font-sans font-medium">Senha</label>
                <input
                  required
                  id="senha"
                  className="text-black font-sans h-8 bg-slate-100 shadow-sm rounded-md outline-0 font-medium p-1"
                  type="password"
                />
              </div>
              <div className="w-full row grid">
                <label className="text-gray-500 font-sans font-medium">Confirme sua senha</label>
                <input
                  required
                  id="senha"
                  className="text-black font-sans h-8 bg-slate-100 shadow-sm rounded-md outline-0 font-medium p-1"
                  type="password"
                />
              </div>
              <div className="flex-row">
                <input type="checkbox" />
                <label className="text-gray-500 font-sans font-medium ml-1">
                  Mostrar senha
                </label>
              </div>
              <div className="flex justify-center">
                <button
                  id="botão"
                  className="bg-blue-500 text-white font-sans w-48 h-8 self-center mx-auto rounded-xl font-bold hover:scale-105 hover:bg-[#488cf9] ease-in-out duration-300"
                >
                  Registrar
                </button>
              </div>
            </form>
            <span className="text-red-500 text-center font-semibold"></span>
          </div>
        </div>
        <img alt="" className="w-4/12 sm:block hidden mx-auto mt-16" src={SVG} />
      </main>
            <MobileNav/>
        </div>
    )
}