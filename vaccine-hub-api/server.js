const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const { NotFoundError } = require("./utils/errors")
const {BadRequestError, NotFoundError} = require("./utils/errors")

const app = express()


app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))

app.use((req, res, next) => {
    return next(new BadRequestError.NotFoundError)
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message
    
    return err.status(status).json({
        error: {message, status}
    })
})


const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`🚀 Server listening on port ` + port)
})