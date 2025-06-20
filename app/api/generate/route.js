// app/api/shorten/route.js
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await req.json();
    const { originalUrl, preferredName } = body;

    if (!originalUrl || !preferredName) {
      return NextResponse.json({ error: 'Original URL and preferred name are required' }, { status: 400 });
    }

    try {
      new URL(originalUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    if (!/^[a-z0-9-]+$/.test(preferredName)) {
      return NextResponse.json({ error: 'Name can only contain lowercase letters, numbers, and hyphens' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('urls');

    const existingUrl = await collection.findOne({ preferredName });
    if (existingUrl) {
      return NextResponse.json({ error: 'This short name is already taken' }, { status: 409 });
    }

    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${preferredName}`;
    const urlDocument = {
      originalUrl,
      preferredName,
      shortUrl,
      userId: session.user.email, 
      createdAt: new Date(),
      clicks: 0,
    };

    await collection.insertOne(urlDocument);

    return NextResponse.json(urlDocument, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
