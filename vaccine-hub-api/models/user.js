const bcrypt = require("bcrypt")
const {BadRequestError, UnauthorisedError} = require("../utils/errors")
const {BCRYPT_WORK_FACTOR} = require("../config")
const db = require("../db")

class User {
    static async makePublicUser(user) {
        return {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            location: user.location,
            date: user.date
        }
    }


    static async login(credentials) {
        // user required to submit email/password; throws error if either is missing
        const requiredFields = ["email", "password"]

        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        // look up user in db by email
        const user = await User.fetchUserByEmail(credentials.email)

        // if user is found, compare submitted password/db password
        // if password matches, return the user
        if (user) {
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if (isValid) {
                return User.makePublicUser(user)
            }
        } 

        // throws error if any of this goes wrong
        throw new UnauthorisedError("Invalid email/password")
    }


    static async register(credentials) {
        // user required to submit email, password, first & last name, & location
        // throws error if any is missing
        const requiredFields = ["email", "password", "firstName", "lastName", "location"]

        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email.")
        }

        // check if user email exists in db; throws error if it does
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
            throw new BadRequestError(`Duplicate email found: ${credentials.email}`)
        }

        // take user's email & lowercase it
        const lowercasedEmail = credentials.email.toLowerCase()

        // take user's password & hash it
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)

        // create new user in db with this info
        const result = await db.query (`
            INSERT INTO users (
                email,
                password,
                first_name,
                last_name,
                location
            )

            VALUES ($1, $2, $3, $4, $5)

            RETURNING id, email, first_name, last_name, location, date;
        `, [lowercasedEmail, hashedPassword, credentials.firstName, credentials.lastName, credentials.location]
        )

        // return the user 
        const user = result.rows[0]

        return User.makePublicUser(user)
    }


    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email was provided.")
        }

        const query = `
            SELECT *
            FROM users
            WHERE email = $1
        `

        const result = await db.query(query, [email.toLowerCase()])
        const user = result.rows[0]

        return user
    }
}


module.exports = User