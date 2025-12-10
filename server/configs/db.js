import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("DataBase Connected");
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/todoapp`);
    } catch (error) {
        console.log(error.message);
    }
}

export default connectToDb;