'use client';
import { Button } from '../button';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { updateVote } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

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

  return (
    <form action={dispatch}>
      <div className="m-4">
        <Button type="submit" isdeActive={!voted}>
          <p>再投票</p>
        </Button>
      </div>
    </form>
  );
}
