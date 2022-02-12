const express = require('express')
const sequelize = require('./sequelize')
const router = require('./router/routes')
const cors = require('cors')
const path = require('path')
const res = require('express/lib/response')

require('./models/astronaut')
require('./models/spacecraft')


const app = express()
const port = 6060

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());

app.use('/api/', router);

app.listen(port, async () => {
    console.log('Server started on http://localhost:%s', port)
    try {
        await sequelize.authenticate()
        console.log('We are connected to SQLite')
    } catch(err) {
        console.warn(err)
    }
})