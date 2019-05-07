import { SignOptions } from 'jsonwebtoken';

require('dotenv').config();

export const jwtSecretOrPrivateKey = process.env.JWT_SECRET;
export const jwtSignOptions: SignOptions = {
    expiresIn: 3600,
};