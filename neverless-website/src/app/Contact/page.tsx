import Image from "next/image";
import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <main>
      <section id="contact" className="font-home flex min-h-screen w-full items-center flex-col p-10 bg-bg1 bg-cover bg-center bg-gradient-overlay">
        <Navbar/>
        <p>This is the Contact page</p>
      </section>
    </main>
  );
}