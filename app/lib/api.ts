import { sql } from '@vercel/postgres';
import { fetchUserByEmail } from './data';
import { User } from './definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function VoteReset(email: string, lastvotereset: string) {
  if (email === '' || lastvotereset === '') return;
  console.log('o');

  const date = new Date().toISOString().split('T')[0];
  if (lastvotereset === date) return;

  try {
    await sql`
    UPDATE users
    SET voted = ${false}, lastvotereset = ${date}
    WHERE email = ${email}
      `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch User Vote data.');
  }
  revalidatePath('/dashboard');
  redirect('/dashboard');
}
