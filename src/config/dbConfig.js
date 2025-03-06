import mongoose from 'mongoose';

const url = process.env.DB_URL
export const connectionUsingMongoose = async () => {
    try{
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB connected using mongoose successfully")
    } catch(err) {
        console.log("Error while connecting to Database", err);
    }
}