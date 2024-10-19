'use client';

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
    <div className="mb-4">
      <p
        className={`inline-flex w-[200px] items-center justify-between rounded-full bg-blue-600 px-3 py-2 text-lg font-bold text-white shadow-md`}
      >
        {japanesename} : <span className="text-yellow-300">{price}</span>円分
      </p>
      <Image
        src={`/drink/${name}.png`}
        width={200}
        height={200}
        className="hidden rounded-md bg-gray-200 md:block"
        alt="Screenshots of the dashboard project showing desktop version"
        priority={true}
      />
    </div>
  );
}
