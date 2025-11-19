import mongoose from "mongoose"

const connectDB = async () => {
    try {

        let conn = await mongoose.connect(process.env.MONGODB_URI);
        if (conn) {
            console.log(`DataBase Connect SuccessFully`)
        } else {
            console.log(`database not connect`)
        }
    } catch (error) {
        console.log(`DataBase error : ${error}`)
    }
}
 
export default connectDB;