"use client";

import Navbar from "../../components/Navbar";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginModal from "../../components/LoginModal";

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
    router.push('/Merch'); // Redirect back to home (or handle as needed)
  }

  return (
    <main>
      <section id="Merch" className="font-merch flex min-h-screen w-full items-center flex-col p-10 bg-bg4 bg-cover bg-center bg-gradient-overlay">
        <Navbar onModalOpen={handleOpenModal}/>
        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        <h1 className="mt-40 z-10 text-center" style={{fontSize: '80px'}}>Merch coming soon!</h1>
      </section>
    </main>
  );
}