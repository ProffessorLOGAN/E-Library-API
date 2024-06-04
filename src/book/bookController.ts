import { NextFunction, Request, Response } from "express";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  // cconst {title,author,} =req.body;

  console.log("files", req.files);
  res.json({ok:'ok'});
};

export { createBook };
