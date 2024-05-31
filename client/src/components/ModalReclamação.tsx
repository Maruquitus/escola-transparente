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
        const modal = document.getElementById("modal");
        if (!modal?.contains(event.target as Node)) {
          props.setModalAberto(false);
        }
      }}
      className={`${
        props.modalAberto
          ? "opacity-100 pointer-events-auto bg-slate-400/20"
          : "opacity-0 pointer-events-none"
      } fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center transition-opacity duration-300 backdrop-blur-md z-10`}
    >
      <div id="modal" className="md:mb-0 mb-16">
        <h1 className="font-sans w-fit mx-auto font-semibold text-3xl bg-white rounded-lg shadow-md p-3">
          {props.reclamação?.fotos.length > 1
            ? "Imagens anexadas"
            : "Imagem anexada"}
        </h1>

        <div className="hidden md:flex justify-around h-4/5  mt-2">
          {props.reclamação?.fotos.map((foto: string) => {
            return (
              <div className="aspect-[10/11] bg-white px-3 py-4 pb-8 shadow-md rounded-md">
                <div className="bg-gray-300 rounded-lg">
                  <img
                    alt=""
                    src={`/arquivos/${foto}`}
                    className="h-full w-full object-fill aspect-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex md:hidden w-80 bg-white shadow-md px-3 py-4 mt-2 rounded-md">
          <Swiper
            className="p-2 w-full h-80 md:hidden"
            spaceBetween={10}
            modules={[Pagination]}
            pagination={{
              dynamicBullets: true,
            }}
            slidesPerView={1}
            direction="horizontal"
          >
            {props.reclamação?.fotos.map((foto: string) => {
              return (
                <SwiperSlide>
                  <div className="bg-gray-300 rounded-lg">
                    <img
                      alt=""
                      src={`/arquivos/${foto}`}
                      className="w-auto mx-auto object-cover aspect-auto rounded-lg shadow-md"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
