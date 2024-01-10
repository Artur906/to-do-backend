import { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userBody = req.body;
    const user = await userService.create(userBody);

    res.status(201).json(user);
  } catch (err: any) {
    next(err);
  }

}