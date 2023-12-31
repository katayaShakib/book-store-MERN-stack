import express from "express";
import mongoose from "mongoose";
import bookRoute from "./routes/bookroute.js";
import "dotenv/config";
import cors from "cors";

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

// middleware for parsing request body
app.use(express.json());

/* app.use(cors()); */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    AllowedHeaders: "Content-Type",
  })
);

app.get("/", (req, res) => {
  return res.status(234).send("Welcome to Book Store!");
});

app.use("/books", bookRoute);

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
