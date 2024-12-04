const users = require('../models/userModel')
const jwt =  require('jsonwebtoken')
// register
exports.registerController = async (req,res)=>{
    console.log("Inside Register Controller");
    console.log(req.body);
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Already existing user...Please Login!!!")
        }else{
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profilepic:""
            })
            await newUser.save()
            res.status(200).json(newUser) 

        }
    }catch(err){
        res.status(401).json(err)
    }
}

// login
exports.loginController = async (req,res)=>{
    console.log("Inside Login controller");
    const {email,password} = req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email,password})
        
        if(existingUser){
            // token generation
        const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({user:existingUser,token})
        }else{
            res.status(404).json("Invalid Email or password!!!")
        }
    }catch(err){
        res.status(401).json(err)
    }
    
    
}

// profile updation
exports.editUserController = async (req,res)=>{
console.log("Inside editUserController");
const {username,email,password,github,linkedin,profilepic} = req.body
const uploadProfilePic = req.file?req.file.filename:profilepic
const userId = req.userId
try{
    const updatedUser = await users.findByIdAndUpdate({_id:userId},{
        username,email,password,github,linkedin,profilepic:uploadProfilePic
    },{new:true})
    await updatedUser.save()
    res.status(200).json(updatedUser)
}catch(err){
    res.status(401).json(err)
}

}