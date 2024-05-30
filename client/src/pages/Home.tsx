import { useEffect } from "react";
import { Header } from "../components/Header";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MobileNav } from "../components/MobileNav";

export default function Home() {
  const navigate = useNavigate();
  const [logado, ] = useLoaderData() as [boolean, any];

  useEffect(() => {
    if (!logado) navigate("/login");
  }, [logado, navigate]);

  if (logado == null) return <div></div>;

  return (
    <div>
      <Header/>
      <MobileNav />
    </div>
  );
}
