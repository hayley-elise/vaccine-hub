const bcrypt = require("bcrypt")

const userPassword = "password"

bcrypt.hash(userPassword, 6, (err, hashedPassword) => {
    console.log(`User password is: ${userPassword}`)
    console.log(`Hashed version: ${hashedPassword}`)
})