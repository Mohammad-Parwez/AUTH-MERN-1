const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  // ✅ Fixed import
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({ message: "User already exists, you can login", success: false });
        }

        // Hash password and save user
        const newUser = new UserModel({ name, email, password: await bcrypt.hash(password, 10) });
        await newUser.save();

        res.status(201).json({ message: "Signup successful", success: true });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password", success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(401).json({ message: "Invalid email or password", success: false });
        }

        const token = jwt.sign(  // ✅ Fixed jwt usage
            { email: user.email, _id: user.id },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            email,
            name: user.name
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    signup,
    login
};
