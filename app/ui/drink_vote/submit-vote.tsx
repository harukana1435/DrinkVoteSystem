'use client';
import { Button } from '../button';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { createVote } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import clsx from 'clsx';

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
    const className = clsx('bg-cyan-600', {
        'hover:bg-cyan-500 active:bg-cyan-600': !voted,
    });

    return (
        <form action={dispatch}>
            <div className="m-2 flex items-center">
                <Button className={className} type="submit" isdeActive={voted}>
                    <p>投票　　</p>
                </Button>
            </div>
        </form>
    );
}