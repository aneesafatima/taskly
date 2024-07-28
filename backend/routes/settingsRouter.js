const express = require("express");
const { protect } = require("../controllers/authController");

const settingsRouter = express.Router();

settingsRouter.get("/", protect, (req,res) => {
    res.status(200).json({
        status: "success",
        user: req.user
    })
} );

module.exports = settingsRouter;