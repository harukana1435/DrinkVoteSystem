'use client';
import { Button } from '../button';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { createVote } from '@/app/lib/actions';
import { Session } from 'next-auth';
import { useState, useEffect } from 'react';
import { User } from '@/app/lib/definitions';

export function Vote_Button() {
  const searchParams = useSearchParams();
  console.log('client component');

  const [session, setSession] = useState<Session | null>(null);

  const [vote_state, setVote_state] = useState<User | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch('/api/auth/session');

      const sessionData = await res.json();
      console.log('sessionData', sessionData);
      setSession(sessionData);
    }

    fetchSession();
  }, []);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch('/api/auth/session');

      const sessionData = await res.json();
      console.log('sessionData', sessionData);
      setSession(sessionData);
    }

    fetchSession();
  }, []);

  console.log(session?.user?.id);

  return (
    <form action="createVote">
      <div className="m-4">
        <Button type="submit">
          <p>投票</p>
        </Button>
      </div>
      <div>
        <h1>My Client Component</h1>
        <h2>User ID: {session?.user?.email}</h2>
      </div>
    </form>
  );
}
