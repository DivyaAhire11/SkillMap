import jwt from "jsonwebtoken";
import responder from "../Utils/responder.js";

const verifyToken = (req, res, next) => {

    try {
        let { token } = req.session;
        if (!token) {
            return responder(res, 404, "please Login", null)
        } else {
            let decodedData = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decodedData;
            next();        
        
        }   
    } catch (error) {
         return responder(res,error.status || 500 , error.message,null);
    }
}

export default verifyToken