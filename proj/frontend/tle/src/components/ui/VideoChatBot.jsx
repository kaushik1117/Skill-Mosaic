import React, { useState } from 'react';
import axios from 'axios';
import { UserIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'; // Import icons

export default function VideoChatbot({ videoContext }) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        if (!input) return;

        setMessages([...messages, { text: input, isUser: true }]);
        setInput('');

        try {
            const result = await axios.post('http://localhost:4000/chat/api/chatbot/response', {
                text: `${input} Context: ${videoContext}` // Include video context
            });
            setMessages([...messages, { text: input, isUser: true }, { text: result.data, isUser: false }]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5EDED] text-[#6482AD] flex flex-col items-center p-8">
            <h1 className="text-4xl font-bold mb-6 text-[#7FA1C3]">Video Chatbot</h1>
            <div className="bg-[#E2DAD6] w-full max-w-3xl rounded-lg shadow-lg p-6 flex flex-col space-y-6">
                <div className="flex-grow overflow-y-auto max-h-80 bg-white rounded-md p-4 space-y-4 border border-[#7FA1C3]">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-center ${msg.isUser ? 'text-[#F5EDED]' : 'text-[#F5EDED]'} space-x-2`}
                        >
                            <div className={`flex-shrink-0 ${msg.isUser ? 'text-[#6482AD]' : 'text-[#7FA1C3]'} flex items-center`}>
                                {msg.isUser ? (
                                    <UserIcon className="h-6 w-6" />
                                ) : (
                                    <ChatBubbleLeftIcon className="h-6 w-6" />
                                )}
                            </div>
                            <div
                                className={`p-3 rounded-md ${msg.isUser ? 'bg-[#6482AD]' : 'bg-[#7FA1C3]'} flex-grow`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow p-3 rounded-l-md bg-white border-2 border-[#7FA1C3] text-[#6482AD] focus:outline-none focus:ring-2 focus:ring-[#6482AD]"
                        placeholder="Type your question..."
                    />
                    <button
                        onClick={handleSend}
                        className="bg-[#6482AD] text-white px-6 py-3 rounded-r-md hover:bg-[#7FA1C3] transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
