
//==============================
// Import
//==============================
import {
  MongoClient,
  ServerApiVersion,
} from 'mongodb';
import 'dotenv/config';


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

export const cves_database = client.db("cves_database");
export const cves_collection = cves_database.collection("cves");

//==============================
// Functions
//==============================
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

export async function getCVEsInfo() {
  const ret = {
    categories: [],
    total: 0,
  };

  const collections = await cves_database.listCollections().toArray();
  
  for (const col of collections) {
    const length = await cves_database.collection(col.name).countDocuments();
    if (length) {
      ret.categories.push({ name: col.name, length });
      ret.total += length;
    }
  }

  ret.categories.sort((a, b) => b.length - a.length);

  return ret;
}

export async function getCVE( {name, page = 1, pageSize = 100, filter, getAll = false} ) {
  const collection = await cves_database.collection(name);
  let query = {};

  if (filter) {
    query = {
      $or: [
        { id: { $regex: `\\b${filter}\\b`, $options: 'i' } }, // case-insensitive
        { summary: { $regex: `\\b${filter}\\b`, $options: 'i' } },
        { details: { $regex: `\\b${filter}\\b`, $options: 'i' } },
      ],
    };
  }

  let documents = [];
  let totalCount = 0;

  if (getAll) {
    // Total count
    totalCount = await collection.countDocuments(query);
    documents = await collection.find(query).toArray();
  } else {
    // Items that satisfy the query
    totalCount = await collection.countDocuments(query);

    // Calculate items to skip and return documents
    const skip = (page - 1) * pageSize;
    documents = await collection.find(query).skip(skip).limit(pageSize).toArray();
  }

  return { totalCount, documents };
}

