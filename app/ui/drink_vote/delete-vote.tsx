'use client';
import { Button } from '../button';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { deleteVote } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

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

    return (
        <form action={dispatch}>
            <div className="m-4">
                <Button type="submit" isdeActive={!voted}>
                    <p>取り消し</p>
                </Button>
            </div>
        </form>
    );
}
