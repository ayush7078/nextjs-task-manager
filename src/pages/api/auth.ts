// pages/api/auth/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const db = await connectToDatabase();

    if (req.method === 'POST') {
        const { action, email, password } = req.body;

        if (action === 'register') {
            // Check if the email already exists
            const existingUser = await db.collection('users').findOne({ email });

            if (existingUser) {
                return res.status(409).json({ message: 'Email already exists' }); // Conflict status code
            }

            // Handle registration
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await db.collection('users').insertOne({ email, password: hashedPassword });
            return res.status(201).json({ message: 'User registered successfully', userId: user.insertedId });

        } else if (action === 'login') {
            // Handle login
            const user = await db.collection('users').findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
                return res.status(200).json({ message: 'Login successful', token });
            } else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
