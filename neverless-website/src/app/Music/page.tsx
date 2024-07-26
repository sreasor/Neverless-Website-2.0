"use client";

import Image from "next/image";
import Navbar from "../../components/Navbar";
import LoginModal from "@/components/LoginModal";
import {useEffect, useState} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('modal');
    if (query === 'login') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    router.push('?modal=login'); // Update URL with query parameter
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/Music'); // Redirect back to home (or handle as needed)
  }

  return (
    <main>
      <section id="music" className="font-home flex min-h-screen w-full items-center flex-col p-10 bg-bg3 bg-cover bg-center bg-gradient-overlay">
        <Navbar onModalOpen={handleOpenModal}/>
        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        <h1 className="z-10 mt-20" style={{fontSize: '40px'}}>Debut album OUT NOW!</h1>
        <h1 className="z-10 mt-8" style={{fontSize: '30px'}}>Available on all streaming platforms</h1>
        <a href="/" className="w-1/4 h-1/4 z-10 flex justify-center mt-10 pointer-events:auto">
          <img src="album2.jpg" className="hover:-translate-y-1 hover:scale-110 duration-300"></img>
        </a>
        <h1 className="z-10 mt-20" style={{fontSize: '30px'}}>Check out our newest live video!</h1>
      </section>
    </main>
  );
}
