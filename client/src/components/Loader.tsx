export function Loader() {
    return (
        <div className="flex flex-col bg-white w-screen h-screen">
            <div className="m-auto">
                <div className="loader relative mx-auto"></div>
                <h1 className="text-xl font-sans font-medium mb-auto mt-2 text-center text-slate-600">Carregando...</h1>
            </div>
        </div>
    );
}