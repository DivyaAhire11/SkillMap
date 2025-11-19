import bcrypt from "bcrypt";
import User from "../Models/User.model.js";
import responder from "../Utils/responder.js";
import jwt from "jsonwebtoken";

const SignUp = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        if (!name || !email || !password) {
            return responder(res, 400, "Must provide name, email, and password", null);
        }

        let ISUserExits = await User.findOne({ email: email })

        if (ISUserExits) {
            return responder(res, 409, "Email already exists", null);
        }

        let hashPass = await bcrypt.hash(password, 10)

        let CreateNewUser = await User.create({
            name,
            email,
            password: hashPass
        });


        let saveUser = await CreateNewUser.save();

        if (saveUser) {
            return responder(res, 201, "User Created Successfully", {
                name,
                email
            });
        }

    } catch (error) {
        return responder(res, 400, error, null)
    }


}

const LoginApi = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return responder(res, 400, "Email, Password are required", null);
        }

        let FindUSER = await User.findOne({ email });

        if (!FindUSER) {
            return responder(res, 404, "User does not exits", null);
        }

        let isPassMatch = await bcrypt.compare(password, FindUSER.password);

        if (!isPassMatch) {
            return responder(res, 401, "Invalid Credential", null);
        }

        let token = jwt.sign({
            id: FindUSER._id,
            name: FindUSER.name,
            email: FindUSER.email
        }, process.env.JWT_SECRET);


        req.session.token = token;  // store token in Our session...

        return responder(res, 200, "login successfully", null);

    } catch (error) {
        return responder(res, 401, error.message, null);
    }

}



export { SignUp, LoginApi };