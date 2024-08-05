"use client";

import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import AddDateModal from "../../components/AddDateModal"

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

const EditDates = () => {

    const [tourDates, setTourDates] = useState<TourDate[]>([]);
    const[error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchTourDates = async () => {
        const res = await fetch('/api/tourDates');
        const data: TourDate[] = await res.json();
        console.log(data);
        const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setTourDates(sortedData);
    };

    useEffect(() => {
        fetchTourDates();
    }, []);

    const handleDelete = async (id: number) =>
    {
        try{
            const response = await fetch('api/tourDates', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({id})
            });

            const data = await response.json();

            if (response.ok){
                const newDates = tourDates.filter(date => date.id !== id);
                setTourDates(newDates);
                setError('');
            }
            else{
                setError(data.message);
            }
        }
        catch (error) {
            setError('An error occurred while deleting the tour date.');
        }
    }

    const handleCloseModal = () => setIsModalOpen(false);

    const handleOpenModal = () => setIsModalOpen(true);

    // Callback to refresh tour dates
    const handleAddDateSuccess = () => {
        fetchTourDates(); // Refresh the tour dates
        setIsModalOpen(false); // Close the modal
    };

    return (
        <main>
            <section id="datesA" className="font-home min-h-screen bg-bg2 bg-cover flex flex-col pb-20">
                <div className="flex flex-col items-center lg:flex-row lg:justify-between">
                    <a href='/'>
                        <button className="bg-blue-500 h-20 w-40 m-8 rounded-2xl hover:shadow-2xl hover:bg-blue-700 hover:-translate-y-1 hover:scale-110 transition-all ease-in-out duration-300" style={{fontSize: '30px'}}>Home</button>
                    </a>
                    <p className="text-center font-bold mt-12 mb-12" style={{fontSize: '50px', color: '#fff'}}>Upcoming Tour Dates</p>
                    <div className="w-56"></div>
                </div>
                <AddDateModal isModal={isModalOpen} onClose={handleCloseModal} onSuccess={handleAddDateSuccess}/>
                <div className="flex flex-col items-center">
                    <button className="bg-blue-500 h-24 w-24 m-10 rounded-full flex items-center justify-center text-white" onClick={handleOpenModal}style={{fontSize: "70px"}}>+</button>
                </div>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <ul className="flex flex-col items-center w-full gap-8">
                    {tourDates.map((date) => (
                        <div className='w-4/5'>
                            <li key={date.id} className="rounded-2xl text-center pt-8 pb-8" style={{background: '#f9ca3f', border: '2px solid #e48734'}}>
                                <p className="font-bold pb-5" style={{color: 'black', fontSize:'20px'}}>{formatDate(date.date)} - {date.city}, {date.state} - {date.venue}</p>
                                <p style={{color: '#a93a24',}}>{date.address}</p>
                                <button onClick={() => handleDelete(date.id)}>
                                    <FontAwesomeIcon icon={faTrashCan} className="mt-4"style={{color: 'black', fontSize: '30px'}}/>
                                </button>
                            </li>
                        </div>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default EditDates;