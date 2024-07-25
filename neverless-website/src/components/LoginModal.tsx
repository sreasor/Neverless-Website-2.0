import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginModal = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            console.log("before response");
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.role === 'admin') {
                    router.push('/Admin-dashboard');
                } else {
                    router.push('/user-dashboard');
                }
                onClose();
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred during login.');
        }
    }

    if (!isOpen) return null;

    return (
        <div className="transition-all z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="w-1/4 h-1/2 p-6 bg-white shadow-md rounded flex flex-col items-center border-4 border-solid" style={{borderColor: '#ffa645'}}>
                <form onSubmit={handleLogin} className="flex flex-col w-full items-center mb-4">
                    <input 
                        type="text" 
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
                    <button type="submit" className="h-12 w-16 text-white p-2 rounded" style={{backgroundColor: '#ffa645'}}>Login</button>
                </form>
                <button onClick={onClose} className="h-12 w-16 text-white p-2 rounded bg-gray-500">Close</button>
            </div>
        </div> 
    );
};


export default LoginModal;