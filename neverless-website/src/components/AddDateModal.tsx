
import {useState} from 'react';

interface AddDateModalProps {
    isModal: boolean;
    onClose: () => void;
    onSuccess: () => void; 
}

const AddDateModal = ({isModal, onClose, onSuccess}: AddDateModalProps) => {

    const [error, setError] = useState('');
    const [date, setDate] = useState('');
    const [venue, setVenue] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [ticketURL, setTicketURL] = useState('');
    const [address, setAddress] = useState('');

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleNewDate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/tourDates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, venue, city, state, ticketURL, address }),
            });

            if (response.ok) {
                setDate('');
                setVenue('');
                setCity('');
                setState('');
                setTicketURL('');
                setAddress('');
                onSuccess(); // Notify the parent component about the successful addition
            } else {
                const result = await response.json();
                setError(result.message || 'An error occurred while creating the date.');
            }
        } catch (error) {
            setError('An error occurred while creating the date.');
        }
    };

    
    if (!isModal) return null;

    return (
        <div className="transition-all z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="h-3/4 w-1/2 p-6 bg-white shadow-md rounded flex flex-col items-center border-4 border-solid" style={{borderColor: '#ffa645'}}>
                <form onSubmit={handleNewDate} className="flex flex-col w-full items-center mb-4">
                    <input
                        type="date"
                        placeholder="Date"
                        value={date}
                        onChange={handleDateChange}
                        className="mb-4 p-2 border rounded w-full font-bold"
                        style = {{color: 'black'}}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Venue"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className="mb-4 p-2 border rounded w-full font-bold"
                        style = {{color: 'black'}}
                        required
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="mb-4 p-2 border rounded w-full font-bold"
                        style = {{color: 'black'}}
                        required
                    />
                    <input
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="mb-4 p-2 border rounded w-full font-bold"
                        style = {{color: 'black'}}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Ticket URL"
                        value={ticketURL}
                        onChange={(e) => setTicketURL(e.target.value)}
                        className="mb-4 p-2 border rounded w-full font-bold"
                        style = {{color: 'black'}}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mb-4 p-2 border rounded w-full font-bold"
                        style = {{color: 'black'}}
                    />
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    <button type="submit" className="h-12 w-1/2 text-white p-2 rounded hover:scale-110 duration-300" style={{backgroundColor: '#ffa645'}}>Create Date</button>
                </form>
                <button onClick={onClose} className="h-12 w-1/2 text-white p-2 rounded bg-gray-500 hover:scale-110 duration-300">Close</button>
            </div>
        </div>
    );
};

export default AddDateModal;