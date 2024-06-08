import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";

export const register = async (req,res)=>{
    
    const {username, email,password }= req.body;
    //db operations
    //console.log("register endpoint")
    //console.log(req.body)

    try{
    //Hashing password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword)

    //Create User and save to db
    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password:hashedPassword,
        },
    });

    console.log(newUser)

    res.status(201).json({message:"User created successfully"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to create user"});
    }
    
};


export const login = (req,res)=>{
    //db operations
    const { username, password } = req.body;


    //Check if user exists




    //Check if password matches



    //Generate cookie token and send


    //console.log("Login endpoint")
};
export const logout = (req,res)=>{
    //db operations
    console.log("logout endpoints")
};