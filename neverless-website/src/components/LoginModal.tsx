import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginModalProps{
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                onClose();
                if (data.role === 'admin') {
                    router.push('/Admin-dashboard');
                } else {
                    router.push('/user-dashboard');
                }
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred during login.');
        }

        setUsername('');
        setPassword('');
    }

    if (!isOpen) return null;

    return (
        <div className="font-home transition-all z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="h-1/2 w-1/2 p-6 bg-white shadow-md rounded flex flex-col items-center border-4 border-solid" style={{borderColor: '#ffa645'}}>
                <form onSubmit={handleLogin} className="flex flex-col w-full items-center mb-4">
                    <input 
                        type="email" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="mb-4 p-2 border rounded w-full font-bold"
                        style = {{color: 'black'}}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="mb-4 p-2 border rounded w-full font-bold"
                        style = {{color: 'black'}}
                    />
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    <button type="submit" className="h-12 w-1/2 text-white p-2 rounded hover:scale-110 duration-300" style={{backgroundColor: '#ffa645'}}>Login</button>
                </form>
                <button onClick={onClose} className="h-12 w-1/2 text-white p-2 rounded bg-gray-500 hover:scale-110 duration-300">Close</button>
            </div>
        </div> 
    );
};


export default LoginModal;