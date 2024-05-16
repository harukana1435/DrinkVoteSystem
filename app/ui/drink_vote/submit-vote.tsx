'use client';
import { Button } from '../button';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { createVote } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export function SubmitVote({
  email,
  voted,
}: {
  email: string;
  voted: boolean;
}) {
  const searchParams = useSearchParams();
  const initialState = { message: null, errors: {} };
  const createVotewithUserinfo = createVote.bind(
    null,
    email,
    searchParams.get('select') ?? '',
    voted,
  );
  const [state, dispatch] = useFormState(createVotewithUserinfo, initialState);

  return (
    <form action={dispatch}>
      <div className="m-4">
        <Button type="submit" isdeActive={voted}>
          <p>投票</p>
        </Button>
      </div>
    </form>
  );
}
