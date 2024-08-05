"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import {SuspenseWrapper, Navbar, LoginModal} from '../../components/SuspenseWrapper';

function Home() {

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
    router.push('/About'); // Redirect back to home (or handle as needed)
  }

  return (
    <main>
      <section id="about" className="font-home flex min-h-screen w-full items-center flex-col p-10 bg-bg5 bg-cover bg-center bg-gradient-overlay">
        <Navbar onModalOpen={handleOpenModal}/>
        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        <p className="z-10 text-center mt-32 aboutText">
          Neverless is a high-energy alternative rock band formed 
          in 2018 from Sarasota, FL. Inspired by a vision to blend 
          genres and break musical barriers, Neverless is sure to give 
          fans of any genre something to appreciate. From metal to
          punk, and jazz to funk (as well as everything in between),
          Neverless brings it all!
        </p>
      </section>
    </main>
  );
}

export default function Page()
{
  return(
    <SuspenseWrapper>
      <Home></Home>
    </SuspenseWrapper>
  );
}