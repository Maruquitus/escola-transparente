import { useEffect } from "react";
import { Header } from "../components/Header";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [logado, usuário] = useLoaderData() as [boolean, any];

    useEffect(() => {
        if (!logado) navigate("/login");
    }, [logado, navigate])

    if (logado == null) return (<div></div>)

    return (
        <div>
            <Header logado={logado} usuário={usuário ? usuário.username : null}/>
        </div>
    )
}