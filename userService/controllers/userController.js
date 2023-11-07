const User = require('../models/userModel')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { __v: 0})
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details:error.message })
    }
}

exports.getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id, { __v: 0 })
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' })
    }
}

exports.createUser = async (req, res) => {
    const { fname, lname, email, phone, password} = req.body
    const emailExist = await User.findOne({email})

    if (emailExist) {
        res.status(400).json({message:"Email already exists"})
        return
    }
    try {
        const newUser = await User.create({
            fname,
            lname,
            email,
            phone,
            password
        })

        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user', details: error.message })
    }
}

exports.updateUserById = async (req, res) => {
    const { id } = req.params
    const { fname, lname, email, phone, password, money} = req.body
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                fname,
                lname,
                email,
                phone,
                password
            },
            { new: true, projection: { __v: 0 } }
        )
        if (updatedUser) {
            res.json(updatedUser)
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' })
    }
}

exports.deleteUserById = async (req, res) => {
    const { id } = req.params
    try {
        const deletedUser = await User.findByIdAndDelete(id)
        if (deletedUser) {
            res.json({ message: 'User deleted successfully' })
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' })
    }
}