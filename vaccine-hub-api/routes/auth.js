const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.post("/register", async(req, res, next) => {
    try {
        // register users (take email & password)
        // create new user in db
    } catch(err) {
        next(err)
    }
})

router.post("/login", async(req, res, next) => {
    try {
        // authenticate user login (take email & password)
    } catch(err) {
        next(err)
    }
})


module.exports = router