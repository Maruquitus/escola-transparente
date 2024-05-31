import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export function ModalReclamação(props: {
  setModalAberto: Function;
  modalAberto: boolean;
  setReclamação: Function;
  reclamação: any;
}) {
  return (
    <div
      onClick={(event) => {
        if (!(event.target as Element).closest(".modal")) {
          props.setModalAberto(false);
        }
      }}
      className={`${
        props.modalAberto
          ? "opacity-100 pointer-events-auto bg-slate-400/20"
          : "opacity-0 pointer-events-none"
      } fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center transition-opacity duration-300 backdrop-blur-md z-10`}
    >
      <div className="md:mb-0 mb-16 md:w-4/5 md:mx-auto">
        <h1 className="modal font-sans w-fit mx-auto font-semibold text-3xl bg-white rounded-lg shadow-md p-3">
          {props.reclamação?.fotos.length > 1
            ? "Imagens anexadas"
            : "Imagem anexada"}
        </h1>

        <div className="hidden md:flex justify-around space-x-4 w-full mt-2">
          {props.reclamação?.fotos.map((foto: string) => {
            return (
              <div className="aspect-[10/11] w-1/3 modal bg-white px-3 py-4 pb-8 shadow-md rounded-md">
                <div className="bg-gray-300 rounded-lg w-full h-full relative">
                  <img
                    alt=""
                    src={`/arquivos/${foto}`}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex md:hidden w-80 bg-white shadow-md px-3 py-4 mt-2 rounded-md modal">
          <Swiper
            className="p-2 w-full h-80 md:hidden rounded-lg"
            spaceBetween={10}
            modules={[Pagination]}
            pagination={{ dynamicBullets: true }}
            slidesPerView={1}
            direction="horizontal"
          >
            {props.reclamação?.fotos.map((foto: string, index: number) => (
              <SwiperSlide key={index}>
                <div className="bg-gray-300 flex rounded-lg h-72">
                  <img
                    alt=""
                    src={`/arquivos/${foto}`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
