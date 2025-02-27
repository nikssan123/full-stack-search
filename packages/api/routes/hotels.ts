import express from "express";
import { searchHotels, searchById } from "../helpers/searchFunctions";
import { connectDB } from "db/startAndSeedMemoryDB";
import { Hotel, hotelCreationSchema, hotelUpdateSchema, PAGE_LIMIT } from "contants";
import { ObjectId } from "mongodb";
const router = express.Router();

router.get("/",  async (req, res, next) => {
  try{
    const db = await connectDB();

    const { query, page = 1, limit = PAGE_LIMIT } = req.query;

    const searchRes = await searchHotels(db, query as string, Number(page), Number(limit));

    res.json(searchRes);
  }catch(error){
    return next({ status: 500, message: "Error when searching hotels!"});
  }
});

router.post("/", async (req, res, next) => {
    try{
        const db = await connectDB();

        const parsedBody = hotelCreationSchema.parse(req.body);

        const result = await db.collection("hotels").insertOne(parsedBody);

        res.json({ message: "Successfully created a new hotel", result });
    }catch {
        return next({ status: 500, message: "Error when creating a new hotel!"});
    }
});

router.get("/:id",  async (req, res, next) => {
  try{
    const db = await connectDB();
    const result = await searchById(db, req.params.id, "hotels")

    res.json(result);
  }catch(error){
    return next({ status: 500, message: `Error when searching for a hotel with id: ${req.params.id}`});
  }
});

router.put("/:id", async (req, res, next) => {
    try {
        const db = await connectDB();
        const { id } = req.params;

        const parsedBody = hotelUpdateSchema.parse(req.body); 

        const result = await db.collection("hotels").updateOne(
            { _id: new ObjectId(id) }, 
            { $set: parsedBody }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.json({ message: "Hotel successfully updated", result });
    } catch (error) {
        next({ status: 500, message: "Error updating hotel", error });
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const db = await connectDB();
        const { id } = req.params;

        const result = await db.collection("hotels").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Hotel not found" });
        }

        res.json({ message: "Hotel deleted successfully" });
    } catch (error) {
        next({ status: 500, message: "Error deleting hotel", error });
    }
});


export default router;