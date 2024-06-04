import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./Typings";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  try {
    // Database Call
    const user = await userModel.findOne({ email });

    if (user) {
      const error = createHttpError(400, "User already exists with this email");
      return next(error);
    }
  } catch (err) {
    return next(createHttpError(500, "Eror while getting User"));
  }

  /// password -> hash
  const hashPassword = await bcrypt.hash(password, 10);

  let newUser: User;
  try {
    //Process / Logic
    newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
  } catch (err) {
    return next(createHttpError(500, "Error while creating User"));
  }

  try {
    //Token Generation JWT

    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    // Response
    res.status(201).json({ accessToken: token });
  } catch (err) {
    return next(createHttpError(500, "Error while signing jwt token"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, "All fields are requires"));
  }

  // let userPassword : string ;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return next(createHttpError(404, "User not found !!"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(createHttpError(400, "Username or Password incorrect"));
    }

    //crete access token

    const token = sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    res.json({ accessToken: token });
  } catch (err) {
    return next(createHttpError(500, "Error while geting User"));
  }
};

export { createUser, loginUser };
