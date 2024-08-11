import mongoose from 'mongoose';

let isConnected = false;


const connectToDB = async () =>{
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log('MongoDB is already connected')
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
        })

        isConnected = true;
    } catch (error) {
        console.log(error)
    }}

export default connectToDB;

