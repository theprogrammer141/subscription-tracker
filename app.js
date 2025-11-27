import express from "express";
import { PORT } from "./config/env.js";

import cookieParser from "cookie-parser";
import connectToDatabase from "./database/mongodb.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import userRouter from "./routes/user.routes.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("api/v1/workflows", workflowRouter);
app.use(errorMiddleware);
app.use(arcjetMiddleware);
app.use(workflowRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the subscription tracker API");
});

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, async () => {
      console.log(
        `Subscription Tracker API is running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.log("Failed to start server: ", error);
  }
};

startServer();

export default app;
