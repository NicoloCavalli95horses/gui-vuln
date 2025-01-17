
//==============================
// Import
//==============================
import {
  MongoClient,
  ServerApiVersion,
} from 'mongodb';
import 'dotenv/config';
import { readFile } from 'fs/promises';


//==============================
// Consts
//==============================
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.fr7ic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const database = client.db("cves_database");
export const cves_collection = database.collection("cves");

//==============================
// Functions
//==============================
export async function getData() {
  try {
    const results = await cves_collection.find().limit(100).toArray();
    return results;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.log('Error:', err);
  }
}

export async function closeConnection() {
  await client.close();
  console.log('Connection successfully closed');
}

export async function runSeeder() {
  const res = JSON.parse(await readFile("../public/data.json", "utf8"));
  if (!res.data?.length) {
    console.log('Error while reading local JSON data');
    return;
  }
  try {
    const result = await cves_collection.insertMany(res.data);
    return result?.insertedCount;
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}
