"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import { useState, useEffect } from 'react';

export default function Home() {

  const [tourDates, setTourDates] = useState([]);
  useEffect(() => {
    const fetchTourDates = async () => 
    {
      const res = await fetch('/api/tourDates');
      const data = await res.json();
      setTourDates(data);
      console.log(data);
    }
    fetchTourDates();
  }, []);


  return (
    <main>
      <section id="home"  className="font-home flex min-h-screen items-center flex-col p-10 bg-bg1 bg-cover bg-center bg-gradient-overlay">
        <Navbar/>
        <div className="flex justify-between flex-col pt-40">
          <p className="text-center z-10 font-bold" style={{fontSize: '70px', color: '#ffa645'}}>Neverless</p>
          <p className="text-center z-10 mb-12" style={{fontSize: '20px', color: '#ffa645'}}>New album: out now!</p>
          <a href="#datesA" className="z-10 hero-btn">Catch us at a show near you!</a>
        </div>
      </section>
      <section id="datesA">
      <ul>
        {tourDates.map((date) => (
          <li key={date.id}>
            <p>{date.date.toString()}</p>
            <p>{date.venue}</p>
            <p>{date.city}, {date.state}</p>
            <a href={date.ticket_url}>Buy tickets</a>
            <p>{date.address}</p>
          </li>
      ))}
      </ul>

      </section>
    </main>
  );
}