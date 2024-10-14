import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a strong secret in production

export const generateToken = (userId: string, email: string): string => {
    const payload = {
        id: userId,
        email: email,
    };

    // Generate a token with an expiration of 1 hour
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
};

export const verifyToken = (token: string): object | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as object;
    } catch {
        return null; // If the token is invalid or expired, return null
    }
};
