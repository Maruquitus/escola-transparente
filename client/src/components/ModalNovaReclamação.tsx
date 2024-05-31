import { FC } from "react";
import { Item } from "../interfaces";

export const ModalNovaReclamação: FC<{
  items: Item[];
  modalAberto: boolean;
  erro: string | undefined | null;
  setModalAberto: Function;
}> = (props) => {
  const [modalAberto, setModalAberto] = [
    props.modalAberto,
    props.setModalAberto,
  ];
  const items: { name: string; id: string }[] = JSON.parse(
    JSON.stringify(props.items)
  );
  items.sort((a, b) => a.name.localeCompare(b.name));
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
      } absolute transition-opacity duration-300 backdrop-blur-md z-10 w-full h-full justify-center items-center flex`}
    >
      <form
        method="POST"
        action="/api/novaReclamacao"
        id="modal"
        encType="multipart/form-data"
        className="w-full sm:w-2/3 lg:w-1/2 rounded-lg p-10 bg-white shadow-gray-300 shadow-lg mx-auto"
      >
        <i
          className="fa-solid text-2xl fa-x -mr-5 -mt-5 text-gray-400 cursor-pointer transition-all duration-300 hover:scale-105 float-right"
          onClick={() => setModalAberto(false)}
        ></i>
        <h1 className="font-sans text-4xl text-center font-bold mx-auto">
          Dados da reclamação
        </h1>
        {/* Adicionar campo para o estado / cidade */}
        <label className="text-gray-500 text-xl font-sans font-medium">
          Escola
        </label>
        <select
          defaultValue={"Escolha uma escola"}
          className="w-full py-2 px-4 outline-none border-0 bg-slate-100 rounded-md font-sans"
          name="escola"
          form="modal"
        >
          <option selected value="">
            Escolha uma escola
          </option>
          {items.map((item) => {
            if (item.id) return <option value={item.name}> {item.name}</option>;
            return <div></div>;
          })}
        </select>
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
            type="submit"
            id="botão"
            className="bg-blue-500 text-lg text-white font-sans w-64 mt-4 h-9 self-center mx-auto rounded-xl font-bold hover:scale-105 hover:bg-[#488cf9] ease-in-out duration-300"
          >
            Enviar
          </button>
        </div>
        <span className="text-red-500 w-full block text-center font-sans font-medium">
          {props.erro}
        </span>
      </form>
    </div>
  );
};
