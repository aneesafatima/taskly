const Task = require( "../models/taskModel" )
const catchAsync = require('../utils/catchAsync')

exports.getDashboardData = catchAsync( async(req,res,next) => {
    const tasks = await Task.find({user: req.user})
    res.status(200).json({
        status: "success",
        user: req.user,
        tasks
    })
})