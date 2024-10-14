// src/lib/mongodb.ts
import { MongoClient , ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {serverApi: {
  version: ServerApiVersion.v1,
  strict: true,
  deprecationErrors: true,
}};

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function connectToDatabase() {
  const client = await clientPromise;
  return client.db(); // Return the database instance
}
