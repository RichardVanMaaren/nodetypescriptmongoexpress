import { Router, Request, Response } from "express";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/example", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "This is an example route." });
});

export default router;
