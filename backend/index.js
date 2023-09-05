import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { Book } from "./models/bookModel.js";

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

// middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to Book Store!");
});

// Route for saving a new book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send("Send all required fields: title, author, publishYear");
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = Book.create(newBook);

    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for getting all the books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for getting a book by id
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for updating a book
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send("Send all required fields: title, author, publishYear");
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    console.log(result);

    if (!result) {
      return res.status(404).json({ message: "Book is not found" });
    }

    return res.status(200).send({ message: "Book is updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for deleting a book
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    console.log(result);

    if (!result) {
      return res.status(404).json({ message: "Book is not found" });
    }

    return res.status(200).send({ message: "Book is deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
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
