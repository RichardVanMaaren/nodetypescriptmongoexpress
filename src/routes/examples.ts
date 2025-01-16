import { Router, Request, Response } from "express";
import { authenticateToken } from "../middleware/auth";
import addNumbers from "../controller/functions";

const router = Router();

router.get("/example", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "This is an example route." });
});



router.post("/example-request",  (req: Request, res: Response) => {

  let { xmlFile } = req.body;
  xmlFile='<somtag>'+xmlFile+'</somtag>'+addNumbers('1','2');
  res.json({ result: xmlFile});

});
export default router;

