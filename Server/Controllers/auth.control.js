import bcrypt from "bcrypt";
import User from "../Models/User.model.js";
import responder from "../Utils/responder.js";
/*
 SIGNUP API
 1 . email , password and name take from user
 2 . check email ,pass & name from req.body 
 3 . user is exit?
 4 . hash password = bcrypt package
 5 . save in DB new record(hash pass,email,name,timestamp)
 6 . return success responce

 LOGIN API
 1 . User input (username , email ,password) POST api
 2 . Validation : Check if the request body contains required fields
 3 . Authentication : Look up the user in your database by email/username.
     Compare the provided password with the stored (hashed) password using a hashing algorithm like bcrypt.
 4 . Token Generate : If authentication succeeds, generate a JWT (JSON Web Token) or session token.
 5 . Responce : success responce 
      else fail : 401 Unauthorized
 */

const SignUp = async (req, res) => {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
         return responder(res, 400, "Must provide name, email, and password");
    }

    let ISUserExits = await User.findOne({ email: email })

    if (ISUserExits) {
        return responder(res, 409, "Email already exists");
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
        name: newUser.name,
        email: newUser.email
    });
    }

    const LoginApi = async(req,res)=>{
    try {
          let {username , email , password} = req.body;
       
      if(!username || !email || !password){
       return responder(res,400,"Email, Password ,Username Must be required",[]);
      }

      let ISExitsUSER = User.findOne({email});
      
      if(ISExitsUSER){
        return responder(res,400,"User Already Exits",[]);
      }

      
    } catch (error) {
        return responder(res, 400, error,null);
    }     

    }
 
}

export { SignUp , LoginApi };