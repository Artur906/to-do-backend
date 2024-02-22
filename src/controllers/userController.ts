import { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";
import { getUserDTO } from "../models/User";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userBody = req.body;
    const user = await userService.register(userBody);

    res.status(201).json({ message: 'Usuário criado com sucesso' });
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

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.body;
    const userData: getUserDTO = await userService.findById(user_id);

    res.status(200).json({ user: { id: userData.id, username: userData.username, email: userData.email } })
  } catch (err: any) {
    next(err);
  }
}