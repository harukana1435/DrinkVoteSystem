'use client'

import { useEffect, useState } from 'react';

// /components/DrinkMessages.js

const DrinkMessages = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('/api/cron');
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                const data = await response.json();
                setMessages(data.text);
            } catch (error) {
            }
        };

        fetchMessages();
    }, []);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default DrinkMessages;