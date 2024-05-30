export function ModalReclamação(props: {
  setModalAberto: Function;
  modalAberto: boolean;
  setReclamação: Function;
  reclamação: any;
}) {
  return (
    <div
      onClick={(event) => {
        const modal = document.getElementById("modal");
        if (!modal?.contains(event.target as Node)) {
          props.setModalAberto(false);
        }
      }}
      className={`${
        props.modalAberto
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center transition-opacity duration-300 backdrop-blur-md z-10`}
    >
      <h1 className="font-sans font-semibold text-3xl bg-white rounded-lg shadow-md p-3">
        {props.reclamação?.fotos.length > 1
          ? "Imagens anexadas"
          : "Imagem anexada"}
      </h1>

      <div className="flex gap-4 overflow-x-scroll lg:overflow-hidden w-4/5">
        {props.reclamação?.fotos.map((foto: string) => {
          return (
            <img
              alt=""
              src={`/arquivos/${foto}`}
              className="w-auto mx-auto object-scale-down aspect-auto mt-2 rounded-lg shadow-md"
            />
          );
        })}
      </div>
    </div>
  );
}
