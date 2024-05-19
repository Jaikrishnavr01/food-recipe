const userModel = require('../models/User_model')
const {v4:uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

exports.signup = async (req, res)=>{
    const {email, password, username} = req.body

    let user = await userModel.findOne({ email });
    if(user){
        return res.status(400).json({message:"email already registered"})
    }

    //password encrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    // generate random activation code
    const activationCode = uuidv4()
    
    user =  new userModel({
        username,
        email,
        password:hashedPassword,
        activationCode
    })

    await user.save()
    res.status(200).json({message:"user created successfully"})
}