"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import { useState, useEffect } from 'react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
}

export default function Home() {

  const [tourDates, setTourDates] = useState([]);
  useEffect(() => {
    const fetchTourDates = async () => 
    {
      const res = await fetch('/api/tourDates');
      const data = await res.json();

      // sort the data
      const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setTourDates(sortedData);
      console.log(data);
    }
    fetchTourDates();
  }, []);


  return (
    <main>
      <section id="home"  className="font-home flex min-h-screen w-full items-center flex-col p-10 bg-bg1 bg-cover bg-center bg-gradient-overlay">
        <Navbar/>
        <div className="flex justify-between flex-col pt-40">
          <p className="text-center z-10 font-bold" style={{fontSize: '70px', color: '#ffa645'}}>Neverless</p>
          <p className="text-center z-10 mb-12" style={{fontSize: '20px', color: '#ffa645'}}>New album: out now!</p>
          <a href="#datesA" className="z-10 hero-btn">Catch us at a show near you!</a>
        </div>
      </section>
      <section id="datesA" className="font-home min-h-screen bg-bg2 bg-cover items-center flex flex-col pb-20">
        <p className="text-center z-10 font-bold mt-12 mb-12" style={{fontSize: '50px', color: '#fff'}}>Upcoming Tour Dates</p>
        <ul className="flex flex-col items-center w-full gap-8">
          {tourDates.map((date) => (
            <a href={date.ticket_url} className='w-4/5 hover:shadow-2xl transition ease-in duration-700 pointer-events:auto'>
              <li key={date.id} className="rounded-2xl text-center pt-8 pb-8" style={{background: '#f9ca3f', border: '2px solid #e48734'}}>
                <p className="font-bold pb-5" style={{color: 'black', fontSize:'20px'}}>{formatDate(date.date)} - {date.city}, {date.state} - {date.venue}</p>
                <p style={{color: '#a93a24',}}>{date.address}</p>
              </li>
            </a>
          ))}
      </ul>

      </section>
    </main>
  );
}