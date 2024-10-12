// src/pages/api/items.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '@/lib/mongodb';
import { Item } from '@/models/Item';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectToDatabase();
  const collection = db.collection<Item>('items');

  switch (req.method) {
    case 'GET':
      const items = await collection.find({}).toArray();
      res.status(200).json(items);
      break;

    case 'POST':
      const newItem = req.body;
      await collection.insertOne(newItem);
      res.status(201).json(newItem);
      break;

    case 'PUT':
      const { _id, ...updateData } = req.body;
      await collection.updateOne({ _id: new ObjectId(_id) }, { $set: updateData });
      res.status(200).json({ _id, ...updateData });
      break;

    case 'DELETE':
      const { _id: deleteId } = req.body;
      if (!deleteId) {
        return res.status(400).json({ error: 'Item ID is required for deletion' });
      }
      await collection.deleteOne({ _id: new ObjectId(deleteId) });
      res.status(204).end();
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
