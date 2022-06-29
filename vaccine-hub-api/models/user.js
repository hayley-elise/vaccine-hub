const {BadRequestError, UnauthorisedError} = require("../utils/errors")
const db = require("../db")

class User {
    static async register(credentials) {
        // user required to submit email, password, first & last name, location & date 
        // throws error if any is missing
        const requiredFields = ["email", "password", "first_name", "last_name", "location", "date"]

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


        // create new user in db with this info
        const result = await db.query (`
            INSERT INTO users (
                email,
                password,
                first_name,
                last_name,
                location,
                date
            )

            VALUES (s1, s2, s3, s4, s5, s6)

            RETURNING id, email, first_name, last_name, location, date;
        `, [lowercasedEmail, credentials.password, credentials.firstName, credentials.lastName, credentials.location, credentials.date]
        )

        // return the user 
        const user = result.rows[0]

        return user
    }

    static async login(credentials) {
        // user required to submit email/password; throws error if either is missing
        // 
        // look up user in db by email
        // if user is found, compare submitted password/db password
        // if password matches, return the user
        // 
        // throws error if any of this goes wrong
        throw new UnauthorisedError("Invalid email/password")
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