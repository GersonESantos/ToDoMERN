import mongoose from "mongoose";
const dbConnection = async () => {
try {
   await mongoose.connect(process.env.MONGODB_URI)
 console.log("MongoDB Atlas CONECTADO!")
} catch (error) {
    console.log("Db Error:" + error );
};
}

export default dbConnection;


