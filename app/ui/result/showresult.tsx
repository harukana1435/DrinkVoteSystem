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
            <p>
                {name} : {price}円分
            </p>
        </div>
    );
}