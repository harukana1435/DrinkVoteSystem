import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import VoteButton from '@/app/ui/drink_vote/vote-button';
import { MdLocalDrink } from 'react-icons/md';
import { MdHowToVote } from 'react-icons/md';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-cyan-600 p-4 md:h-40"
        href="/"
      >
        <div
          className="mt-2 flex flex-col items-center"
          style={{ transform: 'translateY(-30px)' }}
        >
          <h2 className="mb-1 font-sans text-xl font-bold text-white">
            田原・清研究室
          </h2>
          <div className="flex items-center space-x-2">
            <MdLocalDrink className="transform text-3xl text-white transition-transform duration-300 hover:scale-105" />
            <h1 className="font-sans text-2xl font-bold text-white">
              飲み物投票サイト
            </h1>
          </div>
        </div>
      </Link>
      <div className="flex hidden h-auto w-full grow flex-col rounded-md bg-gray-50 md:flex md:flex-col">
        <div className="flex-grow">
          <NavLinks />
        </div>
        <div className="mb-4">
          <VoteButton />
        </div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 active:bg-sky-50 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
