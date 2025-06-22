import userModel from "../models/userSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {

  try {
    const {name, email, password} = req.body;
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({success:false, message: "Please fill all the fields" });
    }
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({success:false, message: "User already exists" });
    }
    // Hash the password
    // Generate salt and hash the password
    // Use bcrypt to hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    }); 

    await newUser.save();

    const token = jwt.sign({id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {expiresIn: '7d'});
    
    res.cookie('token',{
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }); 

    const userResponse = {
        id: newUser._id,
        username: newUser.name,
        email: newUser.email,
    };  

    res.status(201).json({success:true, message: "User registered successfully", user: userResponse, token });

  }
  catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({success:false, message: "Internal server error" });
  }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        // Validate input

        if(!email || !password) {
            return res.status(401).json({success:false, message: "Please fill all the fields" });
        }

        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if(!existingUser) {
            return res.status(404).json({success:false, message: "User does not exist" });
        }

        // Check if password is correct 
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid) {
            return res.status(401).json({success:false, message: "Invalid credentials" });
        }   

        // Generate JWT token
        const token = jwt.sign({id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET, {expiresIn: '7d'});      

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        const userResponse = {
            id: existingUser._id,
            username: existingUser.name,
            email: existingUser.email,
        };

        res.status(200).json({success:true, message: "User logged in successfully", user: userResponse , token});

    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({success:false, message: "Internal server error" });
    }   
}

export { register };
export { login };
// This code defines a register function that handles user registration.

