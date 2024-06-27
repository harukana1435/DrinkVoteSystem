'use client';
import { Button } from '../button';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { updateVote } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import clsx from 'clsx';

export function ChangeVote({
  email,
  voted,
}: {
  email: string;
  voted: boolean;
}) {
  const searchParams = useSearchParams();
  const initialState = { message: null, errors: {} };
  const updateVotewithUserinfo = updateVote.bind(
    null,
    email,
    searchParams.get('select') ?? '',
    voted,
  );
  const [state, dispatch] = useFormState(updateVotewithUserinfo, initialState);

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
          <p>再投票</p>
        </Button>
      </div>
    </form>
  );
}
