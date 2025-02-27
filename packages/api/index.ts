import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from "./db/startAndSeedMemoryDB";
import { searchCities, searchCountries, searchHotels } from "helpers/searchFunctions";
import { PAGE_LIMIT } from "contants";

import hotelsRoutes from "./routes/hotels"
import countriesRoutes from "./routes/countries";
import citiesRoutes from "./routes/cities";
import { errorHandler } from "./helpers/errors";

dotenv.config();


if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/search', async (req, res, next) => {
  try{
    const db = await connectDB();
    const { query, hotels_page = 1, countries_page = 1, cities_page = 1, limit = PAGE_LIMIT } = req.query;

    const hotels = await searchHotels(db, query as string, Number(hotels_page), Number(limit));
    const countries = await searchCountries(db, query as string, Number(countries_page), Number(limit));
    const cities = await searchCities(db, query as string, Number(cities_page), Number(limit));

    res.json({
      hotels,
      countries,
      cities
    });
  }catch(error){
    return next({ status: 500, message: "Something went wrong!" });
  }
});

app.use("/hotels", hotelsRoutes);
app.use("/countries", countriesRoutes);
app.use("/cities", citiesRoutes);

app.use((_req, _res, next) => {
  return next({ status: 404, message: "Not Found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`API Server Started at ${PORT}`)
});