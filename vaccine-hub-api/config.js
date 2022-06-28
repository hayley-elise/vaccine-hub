require("dotenv").config()
require("colors")

const PORT = process.env.Port ? Number(process.env.PORT) : 3001


function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "vaccine_hub"

    // if DATABASE_URL environment variable exists, use it
    // otherwise, create db connection string ourselves
    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}


console.log("process.env: ".yellow, Object.keys(proccess.env))
console.log("App Config".red)
console.log("PORT: ".blue, PORT)
console.log("Database URI: ".blue, getDatabaseUri())
console.log("~~~~~~~~~~~~~~~~~~~~~~~")


module.exports = {
    PORT,
    getDatabaseUri
}