"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {SuspenseWrapper, Navbar, LoginModal} from '../components/SuspenseWrapper';

interface TourDate {
  date: string; // Assuming the date is a string; if it's a Date object, use Date instead
  address: string;
  city: string;
  id: number;
  state: string;
  ticket_url: string;
  venue: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
}

function Home() {

  const [tourDates, setTourDates] = useState<TourDate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTourDates = async () => {
      const res = await fetch('/api/tourDates');
      const data: TourDate[] = await res.json();

      // sort the data
      const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setTourDates(sortedData);
      console.log(data);
    }
    fetchTourDates();
  }, []);

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
    router.push('/'); // Redirect back to home (or handle as needed)
  }

  return (
      <main className="no-scroll">
        <section id="home" className="font-home flex min-h-screen w-full items-center flex-col p-10 bg-bg1 bg-cover bg-center bg-gradient-overlay">
          <Navbar onModalOpen={handleOpenModal} />
          <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
          <div className="flex justify-between flex-col homeDiv">
            <p className="text-center z-10 font-bold neverlessTitle" style={{color: '#ffa645'}}>Neverless</p>
            <p className="text-center z-10 mb-12" style={{fontSize: '20px', color: '#ffa645'}}>New album: out now!</p>
            <a href="#datesA" className="z-10 hero-btn text-center">Catch us at a show near you!</a>
          </div>
        </section>
        <section id="datesA" className="font-home min-h-screen bg-bg2 bg-cover items-center flex flex-col pb-20">
          <p className="text-center z-10 font-bold mt-12 mb-12 upcomingDatesTitle" style={{ color: '#fff'}}>Upcoming Tour Dates</p>
          <ul className="flex flex-col items-center w-full gap-8">
            {tourDates.map((date) => (
              <a href={date.ticket_url} className='w-4/5 hover:scale-110 duration-300 pointer-events:auto'>
                <li key={date.id} className="rounded-2xl text-center pt-8 pb-8" style={{background: '#f9ca3f', border: '2px solid #e48734'}}>
                  <p className="font-bold pb-5 tourDate">{formatDate(date.date)} - {date.city}, {date.state}<br></br>{date.venue}</p>
                  <p className="dateAddr" style={{color: '#a93a24'}}>{date.address}</p>
                </li>
              </a>
            ))}
          </ul>
        </section>
      </main>
  );
}

export default function Page() {
  return(
    <SuspenseWrapper>
      <Home></Home>
    </SuspenseWrapper>
  );
}
