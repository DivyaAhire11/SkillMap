import express from "express";
import { config } from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const app = express();
const PORT = 3000 || process.env.PORT;

//-------MiddleWare--------
import verifyToken from "./Middleware/verifyJWT.js"


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRETE, //Used to sign the session ID cookie.
    resave: false,   //session won’t be re-saved if nothing changed.// This reduces unnecessary writes to the session store.
    saveUninitialized: false, //sessions won’t be stored until something is added (like user login info)
    cookie: {
        httpOnly: true, //Cookie can’t be accessed via JavaScript(document.cookie) protect
        maxAge: 1000 * 60 * 60 * 24 * 7  //7 days lifespan
    }
}))


//-------Configuration-------
import connectDB from "./Config/ConnectDB.js";


//----------Utils-------------
import responder from "./Utils/responder.js";

//------Controllers----------
import { SignUp, LoginApi } from "./Controllers/auth.control.js";
import { ganarateRoadmap } from "./Controllers/roadmapControl.js"


app.post("/api/signup", SignUp);
app.post("/api/login", LoginApi);
app.post("/api/roadmap",verifyToken, ganarateRoadmap);


app.get("/dashboard", verifyToken, (req, res) => {
    console.log(req.user.id)
    return responder(res, 200, "dashboard", null);
})

app.get("./health", (req, res) => {
    return req.status(200).json({ data: Date.now(), message: "Server Running Healthy" })
})

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
    connectDB();
});

