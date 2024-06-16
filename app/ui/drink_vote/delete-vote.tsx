'use client';
import { Button } from '../button';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { deleteVote } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import clsx from 'clsx';
export function DeleteVote({
  email,
  voted,
}: {
  email: string;
  voted: boolean;
}) {
  const initialState = { message: null, errors: {} };
  const deleteVotewithUserinfo = deleteVote.bind(null, email, voted);
  const [state, dispatch] = useFormState(deleteVotewithUserinfo, initialState);
  const className = clsx(
    'bg-cyan-600 w-60 h-12 flex justify-center items-center',
    {
      'hover:bg-cyan-500 active:bg-cyan-600': voted,
    },
  );

  return (
    <form action={dispatch}>
      <div className="flex items-center">
        <Button className={className} type="submit" isdeActive={!voted}>
          <p>取り消し</p>
        </Button>
      </div>
    </form>
  );
}