import bcrypt from "bcrypt";
import User from "../Models/User.model.js";
/*
 1 . email , password and name take from user
 2 . check email ,pass & name from req.body 
 3 . user is exit?
 4 . hash password = bcrypt package
 5 . save in DB new record(hash pass,email,name,timestamp)
 6 . return success responce

*/

const SignUp = async (req, res) => {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({
            data: null,
            msg: "Must be required email,password and name"
        })
    }

    let ISUserExits = await User.findOne({ email: email })

    if (ISUserExits) {
        return res.json({
            data: null,
            msg: "email already exits"
        })
    }

    let hashPass = await bcrypt.hash(password, 10)

    let CreateNewUser = await User.create({
        name,
        email,
        password: hashPass
    });


    let saveUser = await CreateNewUser.save();

    if (saveUser) {
        return res.json({
            data: [],
            msg: "User Create SuccessFully"
        })
    }

    return res.json({
        msg: "Data  received",
        data: { name, email, password }
    })
}

export { SignUp };