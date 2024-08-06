import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    // console.log(req)
    const result = schema.safeParse(req.body);
    if (!result.success) {
        console.log(result.error.errors)
      return res.status(400).json({ message: result.error.errors[0].message });
    }
    next();
  };

export default validateRequest;
