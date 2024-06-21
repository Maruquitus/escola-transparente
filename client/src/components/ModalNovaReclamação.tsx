import { FC, useEffect } from "react";
import { useState } from "react";

export const ModalNovaReclamação: FC<{
  modalAberto: boolean;
  erro: string | undefined | null;
  setModalAberto: Function;
  escola: string;
  submit: Function;
}> = (props) => {
  const [reclamaçãoEnviada, setEnviada] = useState(false);
  const [modalAberto, setModalAberto] = [
    props.modalAberto,
    props.setModalAberto,
  ];

  useEffect(() => {
    setEnviada(false);
  }, []);
  return (
    <div
      onClick={(event) => {
        const modal = document.getElementById("modal");
        if (!modal?.contains(event.target as Node)) {
          setModalAberto(false);
        }
      }}
      className={`${
        modalAberto
          ? "opacity-1 pointer-events-auto bg-slate-400/20"
          : "opacity-0 pointer-events-none"
      } fixed  transition-opacity duration-300 backdrop-blur-md z-10 w-full h-full justify-center items-center flex`}
    >
      <form
        onSubmit={async (e) => {
          setEnviada(true);
          e.preventDefault();
          const res = await props.submit(new FormData(e.currentTarget));
          if (res.status === 200) {
            window.location.reload();
            alert("Reclamação feita com sucesso!");
          } else setEnviada(false);
        }}
        id="modal"
        className="w-full sm:w-2/3 lg:w-1/2 rounded-lg p-10 bg-white shadow-gray-300 shadow-lg mx-auto"
      >
        <i
          className="fa-solid text-2xl fa-x -mr-5 -mt-5 text-gray-400 cursor-pointer transition-all duration-300 hover:scale-105 float-right"
          onClick={() => setModalAberto(false)}
        ></i>
        <h1 className="font-sans text-4xl text-center font-bold mx-auto">
          Dados da reclamação
        </h1>
        <input
          type="text"
          name="escola"
          className="hidden"
          value={props.escola}
        />
        <label className="text-gray-500 text-xl font-sans font-medium">
          Título
        </label>
        <input
          className="block py-2 px-4 bg-slate-100 text-black font-sans rounded-md border-0 outline-none w-full"
          type="text"
          required
          name="titulo"
        />
        <label className="text-gray-500 text-xl font-sans font-medium">
          Descreva sua reclamação
        </label>

        <textarea
          name="texto"
          form="modal"
          required
          className="text-black resize-none w-full font-sans h-28 bg-slate-100 shadow-sm rounded-md outline-0 font-normal py-2 px-4"
        />
        <label className="text-gray-500 text-xl font-sans font-medium">
          Fotografia
        </label>
        <input
          name="fotos"
          onChange={(event) => {
            const files = event.target.files;
            const label = document.getElementById("fileLabel");
            if (files && files?.length <= 3) {
              let nomes: String[] = [];
              Array.from(files).forEach((f) => nomes.push(f.name));
              if (label) label.textContent = nomes.join(", ");
            } else {
              alert("Atenção! Você só pode inserir até 3 imagens.");
              event.target.value = "";
              if (label) label.textContent = "Escolha até 3 imagens (opcional)";
            }
          }}
          id="file"
          accept="image/*"
          multiple
          max={3}
          type="file"
          className="hidden"
        />

        <label
          id="fileLabel"
          onClick={() => document.getElementById("file")?.click()}
          className="block py-2 px-4 bg-slate-100 text-gray-500 font-sans rounded-md cursor-pointer truncate"
        >
          Escolha até 3 imagens (opcional)
        </label>
        <div className="w-full items-center justify-center flex">
          <button
            disabled={reclamaçãoEnviada}
            id="botão"
            type={reclamaçãoEnviada ? "button" : "submit"}
            className="bg-blue-500 text-lg disabled:bg-slate-400 disabled:cursor-wait text-white font-sans w-64 mt-4 h-9 self-center mx-auto rounded-xl font-bold hover:scale-105 hover:bg-[#488cf9] ease-in-out duration-300"
          >
            {reclamaçãoEnviada ? "Enviando..." : "Enviar"}
          </button>
        </div>
        <span className="text-red-500 w-full block text-center font-sans font-medium">
          {props.erro}
        </span>
      </form>
    </div>
  );
};
