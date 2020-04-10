const express = require('express')
const restful = require('node-restful')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const mongoose = restful.mongoose

mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

//ODM
const tasks = restful.model('Tasks', {
    title: { type: String, required: true },
    description: { type: String },
    date_start: { type: Date },
    date_end: { type: Date },
})

//Rest API
tasks.methods(['get', 'post', 'put', 'delete'])
tasks.updateOptions({ new: true, runValidators: true })
tasks.register(app, '/tasks')

app.listen(3000)