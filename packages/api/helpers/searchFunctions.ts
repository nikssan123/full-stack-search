import { Db, ObjectId } from "mongodb";

type SearchResult = {
  results: any[];
  totalResults: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
} | { error: string };

const searchCollection = async (
  db: Db,
  collectionName: string,
  query: string,
  page: number,
  limit: number,
  searchFields: string[]
): Promise<SearchResult> => {
  try {
    const collection = db.collection(collectionName);

    const filter = query
      ? {
          $or: searchFields.map(field => ({
            [field]: { $regex: query, $options: "i" }
          }))
        }
      : {};

    const totalResults = await collection.countDocuments(filter);
    const results = await collection
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return {
      results,
      totalResults,
      page,
      totalPages: Math.ceil(totalResults / limit),
      hasMore: page * limit < totalResults
    };
  } catch (error) {
    throw error;
  }
};

export const searchHotels = (db: Db, query: string, page: number, limit: number) =>
  searchCollection(db, "hotels", query, page, limit, ["name", "country"]);

export const searchCountries = (db: Db, query: string, page: number, limit: number) =>
  searchCollection(db, "countries", query, page, limit, ["country"]);

export const searchCities = (db: Db, query: string, page: number, limit: number) =>
  searchCollection(db, "cities", query, page, limit, ["name"]);

export const searchById = async (db: Db, id: string, collectionName: string) => {
    try{
        const collection = db.collection(collectionName)
        const result = collection.findOne({_id: new ObjectId(id)})
    
        return result;
      }catch(error){
        throw error;
      }
}