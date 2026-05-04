import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet'; 
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import applicationRoutes from './routes/applicationRoutes.js'; // 3. Keep routes modular
import { errorHandler, notFound } from './middleware/errorMiddleware.js'; // 4. Custom errors

// Configuration
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database Connection
connectDB();

// --- MIDDLEWARE ---

// Security - Helmet helps secure your apps by setting various HTTP headers
app.use(helmet({
    crossOriginResourcePolicy: false, // Allows images to be served to the frontend
}));

// CORS Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));

// Request Logging (Professional standard)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body Parsers
app.use(express.json({ limit: '10mb' })); // Higher limit for large JSON data
app.use(express.urlencoded({ extended: true }));

// Static File Serving (Crucial for the "Admin" student to see uploaded files)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// --- ROUTES ---

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Sidama Mesob Unity Center API is operational' });
});

// Your Application Routes
app.use('/api/applications', applicationRoutes);

// --- ERROR HANDLING ---
// These must be at the bottom, AFTER the routes
app.use(notFound);
app.use(errorHandler);

// --- SERVER START ---

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections (e.g., DB connection fails)
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});