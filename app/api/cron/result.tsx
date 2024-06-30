'use client'

import { DrinkResult } from "@/app/lib/definitions"

export function ShowResult({ results }: { results: DrinkResult[] }) {
    const messages = results.map(result => `${result.name}を${result.price}円分購入します`);
    return (
        <div>
            <p>{messages}</p>
        </div>
    )
}
