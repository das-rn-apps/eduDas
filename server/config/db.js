import mongoose from 'mongoose';
import 'dotenv/config'


const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        // console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDB;
