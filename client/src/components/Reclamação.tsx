import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faImages } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import Badge from "./Badge";
import { formatarNome } from "../functions";

export function Reclamação(props: {
  usuário?: string;
  reclamação: any;
  setReclamação?: Function;
  setModalAberto?: Function;
  curtidas: number;
}) {
  const telaHome: boolean = !props.setModalAberto || !props.setReclamação;
  const handleCurtida = async () => {
    if (!telaHome) {
      let sucesso = false;
      sucesso = await fetch(
        `/api/${curtido ? "descurtir" : "curtir"}/${props.reclamação._id}`,
        {
          method: "POST",
        }
      ).then((res) => {
        return res.status === 200;
      });
      if (!sucesso) alert("Faça login para curtir uma reclamação!");
      if (sucesso) {
        setCurtido(!curtido);
        setCurtidas(curtidas + (curtido ? -1 : 1));
      }
    }
  };

  const atualizar = () => {
    fetch(`/api/curtido/${props.reclamação._id}`).then(async (res: any) => {
      if (res.status === 200) setCurtido(await res.json());
    });
  };

  const [curtido, setCurtido] = useState(false);
  const [curtidas, setCurtidas] = useState(props.curtidas);
  useEffect(() => {
    atualizar();
    // eslint-disable-next-line
  }, []);
  return (
    <div
      className={`${
        telaHome ? "p-5 pb-0 hover:scale-95 hover:cursor-pointer" : "p-5"
      } border w-full select-none border-gray-100 bg-blue-500 shadow-md rounded-lg duration-300`}
    >
      {!telaHome && props.reclamação.fotos.length > 0 && (
        <FontAwesomeIcon
          onClick={() => {
            if (!telaHome) {
              props.setModalAberto?.(true);
              props.setReclamação?.(props.reclamação);
            }
          }}
          icon={faImages}
          size="lg"
          color="white"
          className="hover:scale-105 hover:cursor-pointer duration-300 float-end mt-1"
        />
      )}
      {telaHome && (
        <h2 className="font-medium font-sans text-lg text-white">
          {formatarNome(props.reclamação.escola)}
        </h2>
      )}
      <h1
        className={`${"text-xl mb-1"} font-semibold font-sans text-lg text-white`}
      >
        {props.reclamação.título}
      </h1>
      {!telaHome && (
        <p className="text-lg font-sans text-white mb-2">
          {props.reclamação.textoReclamação}
        </p>
      )}
      <div className="flex lg:flex-row flex-col w-full lg:space-x-2 lg:space-y-0 space-y-1">
        <Badge tipo={1} texto={props.reclamação.status} />
        {props.reclamação.fotos && props.reclamação.fotos.length > 0 && (
          <Badge
            tipo={2}
            texto={`${props.reclamação.fotos.length} ${
              props.reclamação.fotos.length > 1
                ? "imagens anexadas"
                : "imagem anexada"
            }`}
          />
        )}
      </div>
      <div className="float-right -translate-y-6 flex items-center">
        <h2 className="font-semibold font-sans mr-1 w-5 h-6 text-right text-white">
          {curtidas}
        </h2>
        <FontAwesomeIcon
          icon={curtido ? faHeart : faHeartOutline}
          onClick={handleCurtida}
          size="lg"
          color="white"
          className={`${
            !telaHome && "hover:scale-105 hover:cursor-pointer duration-300"
          }`}
        />
      </div>
    </div>
  );
}
