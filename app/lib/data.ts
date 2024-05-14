import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { User, Vote, Drink } from './definitions';
import { formatCurrency } from './utils';

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

//追加↓
export async function fetchUser_vote() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    const data = await sql<User>`SELECT * FROM users`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch User Vote data.');
  }
}

export async function fetchDrink() {
  noStore();
  try {
    const data = await sql<Drink>`SELECT * FROM drink`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch drink data.');
  }
}

export async function fetchVote() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    const data = await sql<Vote>`SELECT * FROM vote`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch vote data.');
  }
}
