"use client";

import Navbar from "../../components/Navbar";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginModal from "../../components/LoginModal";

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');

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
    router.push('/Contact'); // Redirect back to home (or handle as needed)
  }

  const handleSignUp = async (event) => 
  {
    event.preventDefault();
    console.log("fName: " + fName);
    console.log("lName: " + lName);

    try {
      const response = await fetch('api/emailList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({fName, lName, email}),
      });

      console.log('made it here');
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        setConfirmation('');
      }
      else{
        setConfirmation(data.message);
        setError('');
      }
    } catch (error) {
      setError("An error occurred during addition of email");
    }

    setEmail('');
    setFName('');
    setLName('');
  }

  return (
    <main>
      <section id="contact" className="font-contact flex min-h-screen w-full items-center flex-col p-10 bg-bg6 bg-cover bg-center bg-gradient-overlay">
        <Navbar onModalOpen={handleOpenModal}/>
        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        <h1 className="z-10 mt-10 text-center lg:text-5xl sm:text-xl">Email: neverlessmakesmusic@gmail.com</h1>
        <div className=" z-10 h-1/2 w-1/2 p-6 mt-10 bg-white rounded flex flex-col items-center border-4 border-solid" style={{borderColor: '#ffa645'}}>
          <form onSubmit={handleSignUp} className="flex flex-col w-full items-center mb-4" title="Join our mailing list!">
            <h1 className="text-center pb-10" style={{fontSize:'20px', color: 'black'}}>
              Join our mailing list!
            </h1>
            <input
              type="text"
              placeholder="First Name"
              value={fName}
              className="mb-4 p-2 border rounded w-full font-bol"
              style= {{color: 'black'}}
              onChange={(e) => setFName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lName}
              className="mb-4 p-2 border rounded w-full font-bol"
              style= {{color: 'black'}}
              onChange={(e) => setLName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="mb-4 p-2 border rounded w-full font-bol"
              style = {{color: 'black'}}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="font-bold text-red-500 text-md mb-2">{error}</p>}
            {confirmation && <p className="font-bold text-green-500 text-md mb-2">{confirmation}</p>}
            <button type="submit" className="h-12 w-1/2 text-white p-2 rounded hover:scale-110 duration-300" style={{backgroundColor: '#ffa645'}}>Submit</button>
          </form>
        </div>
      </section>
    </main>
  );
}