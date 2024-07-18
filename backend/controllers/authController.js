const User = require( "../models/userModel" )

exports.signUp = async (req,res,next) => {
    const user = await User.create({
        email: req.body.email,
        password: req.body.password
    })

    res.status(200).json({
        status: "success",
        data: user
    })
}
exports.logIn = async (req,res,next) => {
 
}