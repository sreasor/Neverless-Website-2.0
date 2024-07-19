import Image from "next/image";
import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <main className="font-home flex min-h-screen flex-col p-5 bg-bg1 bg-cover bg-center bg-gradient-overlay">
      <Navbar/>
      <p>This is the Merch page</p>
    </main>
  );
}