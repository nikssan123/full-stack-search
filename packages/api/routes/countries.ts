import express from "express";
import { searchCountries, searchById } from "../helpers/searchFunctions";
import { connectDB } from "db/startAndSeedMemoryDB";
import { PAGE_LIMIT } from "contants";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const db = await connectDB();
    const { query, page = 1, limit = PAGE_LIMIT  } = req.query;

    const searchRes = await searchCountries(db, query as string, Number(page), Number(limit));

    res.json(searchRes);
  } catch(error) {
    return next({status: 500, message: "Error when searching countries!"})
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const db = await connectDB();
    const result = await searchById(db, req.params.id, "countries")

    res.json(result);
  } catch(error) {
    return next({status: 500, message: `Error when searching for country with id: ${req.params.id}!`});
  }
});

export default router;