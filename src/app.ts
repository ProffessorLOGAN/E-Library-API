import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHander";
import userRouter from "./User/userRouter";
import bookRouter from "./book/bookRouter";

const app = express();

app.use(express.json());

// Routes
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to Elibrary API" });
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

//Global Error Handler
app.use(globalErrorHandler);

export default app;
