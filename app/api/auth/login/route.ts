import { NextResponse } from 'next/server';
import db from '../../../../db';  // Adjust path as needed
import { RowDataPacket } from 'mysql2';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const [user] = await db.promise().query<RowDataPacket[]>(
      `SELECT * FROM users WHERE email = ? AND password = ?`,
      [email, password]
    );

    if (user.length === 0) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Authentication successful', user: user[0] });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: (error as Error).message }, { status: 500 });
  }
}
