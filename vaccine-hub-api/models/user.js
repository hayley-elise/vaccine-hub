const {UnauthorisedError} = require("../utils/errors")

class User {
    static async register(credentials) {
        // user required to submit email/password; throws error if either is missing
        // 
        // check if user email exists in db; throws error if it does
        // 
        // take user's password & hash it
        // take user's email & lowercase it
        // create new user in db with this info
        // return the user 
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
}


module.exports = User