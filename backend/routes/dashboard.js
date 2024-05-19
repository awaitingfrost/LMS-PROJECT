import Book from "../models/Book.js"
import User from "../models/User.js";
import BookTransaction from "../models/BookTransaction.js"
import express from "express"

const router = express.Router();

router.get("/dashboard-counts", async (req, res) => {
  try {
    const Books = await Book.countDocuments();
    const Users = await User.countDocuments();
    const Transactions = await BookTransaction.countDocuments();

    const data = {
      book: Books,
      user: Users,
      transaction: Transactions
    }

    return res.status(200).json(data);

  } catch (err) {
    console.log(err)
    return res.status(504).json(err);
  }
});


export default router;