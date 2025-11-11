import express from "express";
import { config } from "dotenv";
config();

const app = express();
const PORT = 3000 || process.env.PORT;

//-------MiddleWare--------
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



//-------Configuration-------
import connectDB from "./Config/ConnectDB.js";


//------Controllers----------
import { SignUp } from "./Controllers/auth.control.js";

app.post("/api/signup", SignUp);

app.get("./health", (req, res) => {
    return req.status(200).json({ data: Date.now(), message: "Server Running Healthy" })
})

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
    connectDB();
});

