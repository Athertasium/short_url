// app/[shortname]/page.js
import clientPromise from '@/lib/mongodb';
import { notFound } from 'next/navigation';

export default async function RedirectPage({ params }) {
  const { shortname } = await params;

  if (!shortname || shortname === 'favicon.ico') {
    notFound();
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('urls');

    const urlDocument = await collection.findOne({ preferredName: shortname });

    if (!urlDocument) {
      notFound();
    }

  
    collection.updateOne(
      { preferredName: shortname }, 
      { $inc: { clicks: 1 } }
    ).catch(console.error);

   
    return (
      <html>
        <head>
          <meta httpEquiv="refresh" content={`0; url=${urlDocument.originalUrl}`} />
          <title>Redirecting...</title>
        </head>
        <body>
          <p>Redirecting to {urlDocument.originalUrl}...</p>
        </body>
      </html>
    );

  } catch (error) {
    console.error('Database error during redirect:', error);
    notFound();
  }
}
