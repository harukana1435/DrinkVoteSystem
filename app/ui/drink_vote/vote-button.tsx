import { Session } from 'next-auth';
import { auth } from '@/auth';
import { fetchUserByEmail, fetchVote } from '@/app/lib/data';
import { User } from '@/app/lib/definitions';
import { SubmitVote } from './submit-vote';
import { ChangeVote } from './change-vote';
import { DeleteVote } from './delete-vote';

export default async function VoteButton() {
  console.log('server component');
  const session: Session | null = await auth();
  const user: User | null = await fetchUserByEmail(session?.user?.email ?? '');

  console.log(await fetchUserByEmail(session?.user?.email ?? ''));
  console.log(await fetchVote);
  return (
    <>
      <div>
        <SubmitVote
          email={session?.user?.email ?? ''}
          voted={user?.voted ?? false}
        />
      </div>
      <div>
        <ChangeVote
          email={session?.user?.email ?? ''}
          voted={user?.voted ?? false}
        />
      </div>
      <div>
        <DeleteVote
          email={session?.user?.email ?? ''}
          voted={user?.voted ?? false}
        />
      </div>
    </>
  );
}
