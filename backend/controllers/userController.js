const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

// create user
exports.registerUser = async (req, res) => {
    try {
        // Avatar
        
        const {
            firstName,
            lastName,
            location,
            occupation,
            email,
            password,
            confirmPassword,
        } = req.body;
        

        const user = await User.create(
            {
                firstName,
                lastName,
                location,
                occupation,
                email,
                password,
                confirmPassword,
            }

        );



        if (user) {
            console.log("token");
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_TIME,
            });
            console.log("token1");
            res.cookie("token", token, {
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            });

            res.status(200).json({
                success: true,
                message: "User Created Successfully",
                user,
            });
        } else {
            console.log("error");
            res.status(400).json({
                success: false,
                message: "Something Went Wrong",
            });
        }
    } catch (err) {
        console.log("error1");
        res.status(400).json({
            status: 'fail',
            message: err,
        });

    }
};

// login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please enter email and password',
            });
        }

        const user = await User.findOne({ email }).select("+password");
        
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid email or password',
            });
        }

        if (password !== user.password) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid email or password',
            });
        }

        const token =user.getJWTToken();

    //options for cookie
    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpsOnly: true,
    };
    res.status(200).cookie('token',token,options).json({
        success:true,
        user,
        token,
    });
        
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });

    }
};

// logout user
exports.logout = async (req, res) => {
     res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success:true,
        message:"logged Out",
    });
};

// get currently logged in user details
exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
};