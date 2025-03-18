const db = require('../models')
const User = db.users
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Some error occurred' })
    }
}

// Create a user
exports.create = async (req, res) => {
    console.log(req.body)
    const { username, first_name, last_name, email, password, role } = req.body

    // Check that all fields are filled in correctly
    if (!username || !first_name || !last_name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    try {
        // Check if the username is already in use
        const existingUser = await User.findOne({ where: { username } })
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken.' })
        }

        // Hash (Hide) Password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        // User creation
        const newUser = await User.create({
            username,
            first_name,
            last_name,
            email,
            password: hashPassword,
            role,
            status: role === 'mechanic' ? 'waiting' : 'approved'
        })

        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ message: 'Could not insert the data.', error: error.message })
    }
}

// User login
exports.auth = async (req, res) => {
    console.log('Data received :', req.body) // Check

    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' })
    }

    try {
        const user = await User.findOne({ where: { username } })

        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }

        // User status check
        if (user.role === "mechanic" && user.status === "waiting") {
            return res.status(403).json({ message: "Your request to become a mechanic is still waiting for approval." })
        }

        if (user.role === "mechanic" && user.status === "rejected") {
            return res.status(403).json({ message: "Your request to become a mechanic has been rejected." })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password.' })
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '24h' }
        )

        res.status(200).json({ message: 'Login successful', token, user })
    } catch (error) {
        console.error('Erreur serveur:', error)
        res.status(500).json({ message: 'Error during authentication.', error: error.message })
    }
}




// Retrieve a user by username
exports.findOne = async (req, res) => {
    const { username } = req.params

    try {
        const user = await User.findOne({ where: { username } })
        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user.', error: error.message })
    }
}

// Déconnexion
exports.logout = async (req, res) => {
    try {
        res.status(200).json({ message: 'Logout successful.' })
    } catch (error) {
        res.status(500).json({ message: 'Error during logout.', error: error.message })
    }
}

// Retrieve waiting mechanics
exports.getWaitingMechanics = async (req, res) => {
    try {
        const waitingMechanics = await User.findAll({ where: { role: 'mechanic', status: 'waiting' } })
        res.status(200).json(waitingMechanics)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving waiting mechanics.', error: error.message })
    }
}

// Mechanic status update
exports.updateStatus = async (req, res) => {
    const { id, status } = req.body

    try {
        const user = await User.findByPk(id)
        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }

        if (user.role !== 'mechanic') {
            return res.status(400).json({ message: 'Only mechanics can be updated.' })
        }

        await user.update({ status })

        res.status(200).json({ message: `User status updated to ${status}` })
    } catch (error) {
        res.status(500).json({ message: 'Error updating user status.', error: error.message })
    }
}
