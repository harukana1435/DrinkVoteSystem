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
    searchParams.get('query') ?? '',
    voted,
  );
  const [state, dispatch] = useFormState(updateVotewithUserinfo, initialState);

  return (
    <form action={dispatch}>
      <div className="flex items-center m-2">
        <Button type="submit" isdeActive={!voted}>
          <p>再投票　</p>
        </Button>
      </div>
    </form>
  );
}
