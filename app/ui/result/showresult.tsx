'use client'

import Image from 'next/image';

export default function ShowResult({
    name,
    japanesename,
    price,
}: {
    name: string;
    japanesename: string;
    price: number;
}) {

    return (
        <div>
            <p>
                {japanesename} : {price}円分
            </p>
            <Image
                src={"/drink/" + name + ".png"}
                width={200}
                height={200}
                className="rounded-md hidden md:block bg-gray-200"
                alt="Screenshots of the dashboard project showing desktop version"
                priority={true}
            />
        </div>
    );
}