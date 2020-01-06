const path = require('path')

// Init express
const express = require('express')

// Express server setup
const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

// Serve up publicDirectoryPath
app.use(express.static(publicDirectoryPath))

// Listen on port 3000
app.listen(port, () => {
    console.log(`Server now running on: ${port}`)
})