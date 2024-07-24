import { useState } from 'react';

const LoginModal = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        setUsername('');
        setPassword('');
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="transition-all z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="w-1/4 h-1/4 p-6 bg-white shadow-md rounded flex flex-col items-center border-4 border-solid" style={{borderColor: '#ffa645'}}>
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
                <button onClick={handleLogin} className="h-12 w-16 text-white p-2 rounded" style={{backgroundColor: '#ffa645'}}>Login</button>
            </div>
        </div> 
    );
};


export default LoginModal;