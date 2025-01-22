//==============================
// Import
//==============================
import {
  closeConnection,
  connectToDatabase,
  getCVE,
  getCVEsInfo,
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
app.use(express.json());
app.use(cors(corsOptions));

await connectToDatabase();


//==============================
// Routes
//==============================
app.get('/api/get_cves_info', async (_, res) => {
  res.send( await getCVEsInfo() );
});

app.post('/api/get_cve', async (req, res) => {
  res.send( await getCVE( req.body ) );
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