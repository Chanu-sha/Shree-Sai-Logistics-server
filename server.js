import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "https://shreesailogistics.onrender.com",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Logistics Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
