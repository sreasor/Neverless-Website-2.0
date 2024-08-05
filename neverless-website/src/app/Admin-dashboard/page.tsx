"use client";

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import SendEmailModal from '@/components/sendEmailModal';

const AdminDashboard = () => {

    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);

    const handleClose = () => {setModalOpen(false)};
    
    return (
        <main>
            <section id="Admin Dashboard" className="bg-white min-h-screen p-10">
                <div className="flex flex-col">
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between lg:w-full">
                        <button
                            onClick={() => router.push('/')}
                            className="bg-blue-500 h-20 w-40 m-8 rounded-2xl hover:shadow-2xl hover:bg-blue-700 hover:-translate-y-1 hover:scale-110 transition-all ease-in-out duration-300"
                            style={{ fontSize: '30px' }}
                        >
                            Home
                        </button>
                        <h1
                            className="flex-1 text-center text-black adminTitle"
                        >
                            Admin Dashboard
                        </h1>
                        <div className="w-56"></div>
                    </div>
                    <h1 className="text-black text-center mt-32 adminDashText">Woah-oh-oh! Welcome to the cool people club (the inner workings of neverlessband.com)<br></br> <br></br>
                    What would a handsome young lad or lass like you be wanting to do on this fine day?</h1>
                    <div className="flex flex-row justify-center mt-20 space-x-20">
                        <button onClick={() => router.push('/Edit-Dates')}className="text-black h-16 w-48 rounded-2xl hover:-translate-y-1 hover:scale-110 duration-300 hover:shadow-2xl" style={{fontSize: '20px', background: '#f9ca3f'}}>Edit dem dates!</button>
                        <button onClick={() => setModalOpen(true)}className="text-black h-16 w-48 rounded-2xl hover:-translate-y-1 hover:scale-110 duration-300 hover:shadow-2xl" style={{fontSize: '20px', background: '#f9ca3f'}}>Send an Email</button>
                    </div>
                </div>
                <SendEmailModal isModal = {modalOpen} onClose={handleClose}></SendEmailModal>
            </section>
        </main>
    );

};

export default AdminDashboard;