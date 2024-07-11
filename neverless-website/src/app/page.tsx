import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="font-home flex min-h-screen flex-col items-center justify-between p-10 bg-bg1 bg-cover bg-center bg-gradient-overlay">
      <Navbar/>
    </main>
  );
}
