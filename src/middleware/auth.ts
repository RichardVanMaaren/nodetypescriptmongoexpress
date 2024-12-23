import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  user?: string;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = (payload as { id: string }).id;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};