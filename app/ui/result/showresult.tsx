'use client'

import { useEffect, useState } from 'react';

export default function ShowResult({
    name,
    price,
}: {
    name: string;
    price: number;
}) {

    return (
        <div>
            {name}を{price}円分購入します
        </div>
    );
}