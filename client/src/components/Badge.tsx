import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faUserPen as faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Badge(props: {
  texto: string;
  tipo: number;
  tamanho?: number;
}) {
  let cor;
  let tamanho = props.tamanho;
  if (props.tamanho === undefined) tamanho = 1;
  if (props.tipo === 1) {
    cor = props.texto.includes("Não") ? "bg-red-600" : "bg-green-500";
  } else if (props.tipo === 2) {
    cor = "bg-blue-800";
  } else {
    cor = "bg-transparent border";
  }
  return (
    <div
      className={`${cor} rounded-lg w-fit ${
        tamanho === 1 ? "h-8 p-1.5" : "p-2"
      } items-center`}
    >
      <p
        className={`text-white font-sans text-center ${
          tamanho === 1 ? "text-sm" : "text-md"
        } font-medium`}
      >
        {props.tipo !== 1 && (
          <FontAwesomeIcon
            icon={props.tipo === 2 ? faFileImage : faUser}
            color="white"
            className="mr-1"
          />
        )}
        {props.texto}
      </p>
    </div>
  );
}
