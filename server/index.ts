import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import adminRoutes from "./routes/admin"
import userRoutes from "./routes/user"


const app = express();
app.use(cors());
app.use(express.json()); //this is used in place of body parser in the newer express version
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

mongoose.connect('mongodb+srv://deetigupta8:MerUMZDbEafdixt6@cluster0.ewhiqzs.mongodb.net/ecom', { dbName: "ecom" });

app.listen(3000, () => console.log('Server running on port 3000'))