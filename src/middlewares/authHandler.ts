import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ auth: false, message: "Nenhum token foi informado" })

  const jwtSecretKey = process.env.JWT_SECRET_KEY!;

  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) return res.status(500).json({ auth: false, message: "Falha ao autenticar usuário" })

    console.log("token decoded: ", decoded)
    if (typeof decoded == "object") {
      req.body.user_id = decoded?.id
      next()
    }

  })
}