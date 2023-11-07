const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const registerSchema = require("../schemas/registerSchema")
const loginSchema = require("../schemas/loginSchema")
const User = require("../../userService/models/userModel");

exports.register = async (req, res) => {
    const {fname, lname, email, phone, password} = req.body
    const emailExist = await User.findOne({email})

    if (emailExist) {
        res.status(400).json({message:"Email already exists"})
        return
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        fname,
        lname,
        email,
        phone,
        password: hashedPassword,
    })

    try {
        const {error} = await registerSchema.validateAsync(req.body)

        if (error) {
            res.status(400).json(error.details[0].message)
        } else {
            await user.save()
            res.status(200).json({message:"User successfully created"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if (!user) return res.status(400).send("Incorrect email")

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).send("Incorrect Password")

    try {
        const {error} = await loginSchema.validateAsync(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        else {
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
            res.header("Authorization", `Bearer ${token}`).json(token)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}