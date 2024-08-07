import { handleClientScriptLoad } from 'next/script';
import {useState} from 'react';

interface SendEmailModalProps{
    isModal: boolean;
    onClose: () => void;
}

const SendEmailModal = ({isModal, onClose}: SendEmailModalProps) =>
{
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        setMessage(event.target.value);
    }

    const handleSendEmail = async (event: React.FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();

        try {
            const response = await fetch('api/emailList', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok){
                const recipients = await response.json();

                const sendResponse = await fetch('/api/sendEmail', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ recipients, subject, message}),
                });

                if (sendResponse.ok) {
                    const result = await sendResponse.json();
                    setSuccess(result.message);
                    setError('');
                } else {
                    const result = await sendResponse.json();
                    setError(result.message || 'An error occurred while sending the email.');
                    setSuccess('');
                }
            }
            else {
                const result = await response.json();
                setError(result.message || 'An error occurred while creating the date.');
                setSuccess('');
            }

        } catch (error)
        {
            setError('An error occured while sending the email');
            setSuccess('');
        }
        
        setMessage('');
        setSubject('');
    }

    const onClose2 = () =>
    {
        onClose();
        setError('');
        setSuccess('');
    }

    if (!isModal) return null;

    return (
        <div className="transition-all z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="sendEmailModal p-6 bg-white shadow-md rounded flex flex-col items-center border-4 border-solid" style={{borderColor: '#ffa645'}}>
                <form onSubmit={handleSendEmail} className="flex flex-col w-full items-center mb-4">
                    <input
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mb-4 p-2 border rounded w-full font-bold"
                        style = {{color: 'black'}}
                        required
                    />
                    <textarea 
                        value={message} 
                        id="message" 
                        name="message" 
                        rows={10} 
                        cols={75} 
                        placeholder="Enter your message here" 
                        className="mb-4 p-2 border rounded w-full font-bold" 
                        style = {{color: 'black'}} 
                        onChange={handleChangeMessage}
                        required
                        >
                    </textarea>
                    {error && <p className="font-bold text-red-500 text-md mb-2">{error}</p>}
                    {success && <p className="font-bold text-green-500 text-md mb-2">{success}</p>}
                    <button type="submit" className="mt-4 h-12 w-1/2 text-white p-2 rounded hover:scale-110 duration-300" style={{backgroundColor: '#ffa645'}}>Send Email</button>
                </form>
                <button onClick={onClose2} className="h-12 w-1/2 text-white p-2 rounded bg-gray-500 hover:scale-110 duration-300">Close</button>
            </div>
        </div>
    );
};

export default SendEmailModal;