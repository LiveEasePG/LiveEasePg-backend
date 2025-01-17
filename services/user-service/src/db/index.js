import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`Connected to MongoDB on port ${connectInstance.connection.port}`);
    } catch (error) {
        console.log("failed to connect to mongodb",error.message);
        throw error;
    }
}

export default connectDB;