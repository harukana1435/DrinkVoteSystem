'use client'

import Image from 'next/image';

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
            <Image
                src={"/drink/" + name + ".png"}
                width={200}
                height={200}
                className="hidden md:block"
                alt="Screenshots of the dashboard project showing desktop version"
                priority={true}
            />
        </div>
    );
}