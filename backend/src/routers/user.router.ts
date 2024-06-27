import express, {Router, Request, Response} from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model'; 

import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';

const router = Router();

/* 


// Function to simulate user login
const loginUser = async (email: string, password: string): Promise<any> => {
  // Find user by email in sample_users
  const user = sample_users.find(u => u.email === email);

  if (!user) {
    throw new Error("User not found");
  }

  // Compare the provided password with the user's password from sample data
  //const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (password !== user.password) {
    throw new Error("Password does not match");
  }

  // Passwords match, return the user object without the password
  const { password: userPassword, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const app = express();
const PORT = 3000;

app.use(express.json()); // Parse JSON bodies

// Login route
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const loggedInUser = await loginUser(email, password);
    res.send(loggedInUser);
  } catch (error: any) {
    res.status(401).send({ error: error.message });
  }
});
console.log(loginUser)

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 
 */


router.get("/seed", asyncHandler(
  async (req, res) => {
     const usersCount = await UserModel.countDocuments();
     if(usersCount> 0){
       res.send("Seed is already done!");
       return;
     }

     await UserModel.create(sample_users);
     res.send("Seed Is Done!");
 }
 ))

 /* const bcryptPassword = require('bcryptjs'); // Import bcryptjs for password hashing

 router.post("/login", asyncHandler(
   async (req, res) => {
     const { email, password } = req.body;
     
     // Query the user by email
     const user = await UserModel.findOne({ email });
     console.log(user)
 
     if (user) {
       // Compare the hashed password
       const isPasswordMatch = await bcryptPassword.compare(password, user.password);
 
       if (isPasswordMatch) {
         // Passwords match, generate token response and send it
         res.send(generateTokenReponse(user));
       } else {
         // Passwords do not match
         res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
       }
     } else {
       // User with the given email not found
       res.status(HTTP_BAD_REQUEST).send("Username or password is invalid! second else");
     }
   }
 )); */

/* router.post("/login", asyncHandler(
  async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email , password});
    if(user) {
      res.send(generateTokenReponse(user));
    }
    else{
      res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
      console.log(HTTP_BAD_REQUEST);
     }
  }
)) */

router.post('/register', asyncHandler(
  async (req, res) => {
    const {name, email, password, address} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
      res.status(HTTP_BAD_REQUEST)
      .send('User is already exist, please login!');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser:User = {
      id:'',
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false
    }
    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenReponse(dbUser));
  }
))

  const generateTokenReponse = (user : User) => {
    const token = jwt.sign({
      email: user.email, isAdmin: user.isAdmin
    },process.env.JWT_SECRET!,{
      expiresIn:"30d"
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    };
  }


  export default router;