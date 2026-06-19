import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing. Add your MongoDB connection string to the root .env file.");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log('Database connected');
    } catch (error) {
        console.error(`Database connection failed: ${error.message}`);
        throw error;
    }
};
export default connectDB;
