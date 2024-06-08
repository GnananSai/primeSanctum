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


export const login = async (req,res)=>{
    //db operations
    const { username, password } = req.body;

    try{
        const user=await prisma.user.findUnique({
            where:{username}
        }) 

        if(!user) return res,status(404).json({message:"Invalid Credentials"});
  
    
    //Check if user exists
    //Check if password matches

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid) return res.status(404).json({message:"Invalid Credentials"});

    //Generate cookie token and send
    res.setHeader("Set-Cookie","test=" + "myValue")


    //console.log("Login endpoint")
}catch(err){
    console.log(err)
   res.status(500).json({message:"Failed to login"});
}
};
export const logout = (req,res)=>{
    //db operations
    console.log("logout endpoints")
};