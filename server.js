if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// 2. include Router
const indexRouter = require('./routes/index')

// 1. setting MVC
// set view engine
app.set('view engine','ejs')

// where are the view comming from
app.set('views'.__dirname+'/views')

// hook out express layout
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// use mongoDB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
// , {useNewUrlPraser:true}

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


// 3. use Router
app.use('/',indexRouter)

app.listen(process.env.PORT || 3000)
