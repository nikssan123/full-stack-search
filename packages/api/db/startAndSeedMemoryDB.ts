import { MongoMemoryServer } from "mongodb-memory-server";
import { Db, MongoClient } from "mongodb";
import { cities } from "db/seeds/cities.js";
import { countries } from "./seeds/countries";
import { hotels } from "./seeds/hotels";

const mongod = await MongoMemoryServer.create({
  instance: {
    port: 3002,
  }
});
console.log("MongoMemoryServer started on", mongod.getUri());

const uri = mongod.getUri();

process.env.DATABASE_URL = uri;

let client: MongoClient;
let db: Db;

export async function connectDB(): Promise<Db> {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db();

    const countriesCollection = db.collection("countries");
    const citiesCollection = db.collection("cities");
    const hotelsCollection = db.collection("hotels");

    await countriesCollection.insertMany(countries);
    await citiesCollection.insertMany(cities);
    await hotelsCollection.insertMany(hotels);

    countriesCollection.createIndex({ name: "text" });
    citiesCollection.createIndex({ name: "text" });
    hotelsCollection.createIndex({ name: "text", country: "text" });
  }
  return db;
}

process.on('SIGTERM', async () => {
  await mongod.stop();
  process.exit(0);
});