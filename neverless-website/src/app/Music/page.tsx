"use client";

import {useEffect, useState, lazy} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
const Video = lazy(() => import('../../components/Video'));
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faApple, faAmazon, faSoundcloud, faYoutube} from '@fortawesome/free-brands-svg-icons';
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
    router.push('/Music'); // Redirect back to home (or handle as needed)
  }

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 800);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: isLargeScreen ? '25%' : '100%', // Adjust width based on screen size
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const videoContainerStyle = {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%', // Aspect ratio for 16:9 video
    overflow: 'hidden',
    backgroundColor: '#000', // Fallback color
    borderRadius: '8px', // Optional for styling
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Optional for styling
  };


  return (
    <main>
      <section id="music" className="font-music flex min-h-screen justify-center w-full items-center flex-col p-10 bg-bg3 bg-cover bg-center bg-gradient-overlay">
        <Navbar onModalOpen={handleOpenModal}/>
        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        <h1 className="z-10 mt-8" style={{fontSize: '60px'}}>Debut album OUT NOW!</h1>
        <h1 className="z-10 mt-8 text-center" style={{fontSize: '50px'}}>Available on all streaming platforms</h1>
        <div className="flex justify-center container mt-10 items-center">
          <a href={isLargeScreen ? undefined : "https://open.spotify.com/album/4ei9fgmvR2tH4HNhf4LDgs?si=1hBlDERARtOYwa3aSoli_Q" } className="albumLink">
            <img src="album2.jpg" className="w-full h-full object-cover albumImage" alt="Album" />
          </a>
          <a className="absolute z-20 icon-link items-center justify-center" href={"https://youtube.com/playlist?list=OLAK5uy_nx8SjaBqnU6s4v6cztokmMXY0OQmFpX-Y&si=og-TwT1Iq56acyMS"}>
            <FontAwesomeIcon
                icon={faYoutube}
                className="absolute text-white text-2xl hide5 duration-300"
                style={{ zIndex: 20 }}
              />
          </a>
          <a className="absolute z-20 icon-link items-center justify-center" href={"https://soundcloud.com/neverlessmakesmusic"}>
            <FontAwesomeIcon
                icon={faSoundcloud}
                className="absolute text-white text-2xl hide4 duration-300"
                style={{ zIndex: 20 }}
              />
          </a>
          <a className="absolute z-30 icon-link items-center justify-center" href={"https://open.spotify.com/album/4ei9fgmvR2tH4HNhf4LDgs?si=1hBlDERARtOYwa3aSoli_Q"}>
            <FontAwesomeIcon
                icon={faSpotify}
                className="absolute text-white text-2xl hide2 duration-300"
                style={{ zIndex: 20 }}
              />
          </a>
          <a className="absolute z-20 icon-link items-center justify-center" href={"https://amazon.com/music/player/albums/B0BW1GLJ27?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_BM5jtlYq39kqi7DBmaNiyKTDn"}>
            <FontAwesomeIcon
                icon={faAmazon}
                className="absolute text-white text-2xl hide3 duration-300"
                style={{ zIndex: 20 }}
              />
          </a>
          <a className="absolute z-20 icon-link items-center justify-center" href={"https://music.apple.com/us/album/neverless/1672428137"}>
            <FontAwesomeIcon
              icon={faApple}
              className="absolute text-white text-2xl hide1 duration-300"
              style={{ zIndex: 20 }}
            />
          </a>
        </div>
        <h1 className="z-10 mt-20" style={{fontSize: '50px'}}>Check out our newest live video!</h1>
        <div className="z-10 mt-10">
          <Video videoID={"BODwLDiu-es"}></Video>
        </div>
      </section>
    </main>
  );
}

export default function Page(){
  return (
    <SuspenseWrapper>
      <Home></Home>
    </SuspenseWrapper>
  );
}