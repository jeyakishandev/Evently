import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log("JWT_SECRET utilisé :", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { userId: number };
    console.log("Token décodé :", decoded);

    if (typeof decoded === "object" && "userId" in decoded) {
      (req as any).userId = decoded.userId;
      next();
    } else {
      console.error("Le token ne contient pas userId :", decoded);
      res.status(401).json({ message: "Token invalide - userId manquant" });
    }
  } catch (error) {
    console.error("Erreur JWT:", error);
    res.status(401).json({ message: "Token invalide" });
  }
};
