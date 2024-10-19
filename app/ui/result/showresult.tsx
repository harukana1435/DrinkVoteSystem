'use client';

import Image from 'next/image';

export default function ShowResult({
  name,
  japanesename,
  price,
  path,
}: {
  name: string;
  japanesename: string;
  price: number;
  path: string;
}) {
  return (
    <div className="mb-4">
      <p
        className={`inline-flex w-[200px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-blue-600 px-3 py-2 text-base font-bold text-white shadow-md`}
      >
        <span className="text-yellow-300">{price}</span>円分:{' '}
        <span className="text-sm">{japanesename}</span>
      </p>

      <Image
        src={path}
        width={200}
        height={200}
        className="hidden rounded-md bg-gray-200 md:block"
        alt="Screenshots of the dashboard project showing desktop version"
        priority={true}
      />
    </div>
  );
}
