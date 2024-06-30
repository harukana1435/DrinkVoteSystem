'use client'

import { useEffect } from 'react';
import { DrinkResult } from "@/app/lib/definitions"

export default function ShowResult({ results }: { results: DrinkResult[] }) {
    const messages = results.map(result => `${result.name}を${result.price}円分購入します`);

    useEffect(() => {
        if (messages.length > 0) {
            alert(messages.join('\n')); // Join messages with newline for better readability
        }
    }, [messages]);

    return (
        <div>
            {messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}
        </div>
    )
}
