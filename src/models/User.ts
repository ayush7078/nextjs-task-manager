// src/models/User.ts
export interface User {
    _id?: string; // Optional for new users
    email: string;
    password: string;
}
