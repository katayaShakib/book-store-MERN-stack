import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to Book Store!");
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("App is connected to database");
    // to run only if database connection is successful
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
