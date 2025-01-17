//==============================
// Import
//==============================
import {
  getData,
  runSeeder,
  closeConnection,
  connectToDatabase,
} from './database.js';

import express from 'express';
import cors from 'cors';

//==============================
// Consts
//==============================
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
app.use(cors(corsOptions));

await connectToDatabase();


//==============================
// Routes
//==============================
app.get('/api/data', async (req, res) => {
  const data = await getData();
  res.send(data)
});
app.get('/api/seed', async (req, res) => {
  const data = await runSeeder();
  res.send(`${data} data inserted`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});


//==============================
// Graceful shutdown
//==============================
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});