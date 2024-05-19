const userModel = require('../models/User_model')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

exports.signup = async (req, res) => {
    const { email, password, username } = req.body

    let user = await userModel.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "email already registered" })
    }

    //password encrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // generate random activation code
    const activationCode = uuidv4()

    user = new userModel({
        username,
        email,
        password: hashedPassword,
        activationCode
    })

    await user.save()
    // res.status(200).json({ message: "user created successfully" })

    // email sending 
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', //smtp.office365.com  --> outlook, smtp.gmail.com ---> gmail 
        port: 587, // 587 --> for outlook / gmail , 465 -> hostinger
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    // mail activation link
    const activationLink = `http://localhost:${process.env.PORT}/auth/activate/${activationCode}`

    const mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Account activation link',
        text: `Please click on the link to activate your account ${activationLink}`
    }
    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "cannot email activation link is sent" })
        } else {
            console.log(info)
            return res.status(200).json({ message: "email activation link is sent" })
        }
    })
}


exports.activate = async (req, res) => {
    
        const { activationCode } = req.params; // Extract activationCode from req.params
        let user = await userModel.findOne({ activationCode }); // Find the user by activationCode

        if (!user) {
            return res.status(500).json({ message: "Cannot activate: User not found" }); // Return 404 if user not found
        }

        user.isActivated = true; // Set isActivated to true
        await user.save(); // Save the user document

        res.status(200).json({
            message: "Account activated successfully"
        });
};
