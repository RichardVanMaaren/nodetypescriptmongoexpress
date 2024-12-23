import express from 'express';
import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET as string;

// Define types for request bodies
interface LoginRequestBody {
  email: string;
  password: string;
}

interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

// User Registration
router.post(
  '/register',
  async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
    const { username, email, password } = req.body;

    try {
      const user = new User({ username, email, password });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
);

// User Login

router.post(
  '/login',
  async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

       const token =  jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }
);


export default router;
