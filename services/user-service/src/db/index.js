import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/user-service`);
        console.log(`Connected to MongoDB on port ${connectInstance.connection.port}`);
    } catch (error) {
        console.log("failed to connect to mongodb")
        throw error;
    }
}

export default connectDB;