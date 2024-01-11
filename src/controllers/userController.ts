import { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userBody = req.body;
    const user = await userService.register(userBody);

    res.status(201).json(user);
  } catch (err: any) {
    next(err);
  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginBody = req.body;
    const token = await userService.login(loginBody);

    res.status(200).json({ token });
  } catch (err: any) {
    next(err);
  }
}