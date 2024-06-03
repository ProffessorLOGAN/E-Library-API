import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHander";

const app = express();

// Routes
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to Elibrary API" });
});

//Global Error Handler
app.use(globalErrorHandler);

export default app;
