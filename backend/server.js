import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";

import connectDB from "./config/db.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import status from "./routes/statsRoutes.js";

// Configuration
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
dotenv.config();

// Database Connection
connectDB();

// --- MIDDLEWARE ---

// 1. Security - Helmet helps secure your apps by setting various HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Allows images to be served to the frontend
  }),
);

// 2. CORS Configuration - MUST be before any responses (including rate limiters)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

// 3. Body Parsers - MUST be before sanitization so req.body exists
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// 4. Request Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 5. Security - Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// 6. Security - Data Sanitization against XSS
app.use(xss());

// 7. Security - Prevent HTTP Parameter Pollution
app.use(hpp());

// 8. Security - Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again in 15 minutes.",
});
app.use("/api", limiter);

// 9. Static File Serving (Crucial for the "Admin" student to see uploaded files)
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// --- ROUTES ---

app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message: "SidaMOV (Sidama Mesob Online Vacancy) API is operational",
    });
});

// Your Routes
app.use("/api/applications", applicationRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stats", status);
// --- ERROR HANDLING ---
// These must be at the bottom, AFTER the routes
app.use(notFound);
app.use(errorHandler);

// --- SERVER START ---

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
  );
});

// Handle uncaught exceptions synchronously
process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

// Handle unhandled promise rejections (e.g., DB connection fails)
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  server.close(() => process.exit(1));
});
