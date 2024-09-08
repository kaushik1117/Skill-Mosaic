import React, { useState } from 'react';
import axios from 'axios';
import { UserIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'; // Import icons

export default function DoubtsGPT() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        if (!input) return;

        setMessages([...messages, { text: input, isUser: true }]);
        setInput('');

        try {
            const result = await axios.post('http://localhost:4000/chat/api/chatbot/response', {
                text: input,
            });
            setMessages([...messages, { text: input, isUser: true }, { text: result.data, isUser: false }]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8EDE3] text-[#1E2A5E] flex flex-col items-center p-8">
            <h1 className="text-4xl font-bold mb-6 text-[#295F98]">DoubtsGPT</h1>
            <div className="bg-[#55679C] w-full max-w-3xl rounded-lg shadow-lg p-6 flex flex-col space-y-4">
                {/* Chat Message Container */}
                <div className="flex-grow overflow-y-auto max-h-80 bg-white rounded p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-center ${msg.isUser ? 'text-white' : 'text-white'} space-x-2`}
                        >
                            <div
                                className={`flex-shrink-0 ${msg.isUser ? 'text-[#1E2A5E]' : 'text-[#7C93C3]'} flex items-center`}
                            >
                                {msg.isUser ? (
                                    <UserIcon className="h-6 w-6" />
                                ) : (
                                    <ChatBubbleLeftIcon className="h-6 w-6" />
                                )}
                            </div>
                            <div
                                className={`p-3 rounded ${msg.isUser ? 'bg-[#1E2A5E]' : 'bg-[#7C93C3]'} flex-grow`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow p-3 rounded-l-lg bg-white border-2 border-[#7C93C3] focus:outline-none focus:ring-2 focus:ring-[#55679C]"
                        placeholder="Type your question..."
                    />
                    <button
                        onClick={handleSend}
                        className="bg-[#1E2A5E] text-white px-6 py-3 rounded-r-lg hover:bg-[#F8EDE3] hover:text-[#7C93C3] transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
