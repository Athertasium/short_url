// app/api/urls/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

  
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const urlsCollection = db.collection('urls');

    const userUrls = await urlsCollection
      .find({ userId: session.user.email }) 
      .sort({ createdAt: -1 }) 
      .toArray();

   
    return NextResponse.json(userUrls);

  } catch (error) {
    console.error('API Error fetching user URLs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
