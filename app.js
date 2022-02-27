const express = require('express')
const app = express()
const port = 5555

const ejs = require("ejs")
const mongoose = require('mongoose')

const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const photoController = require('./controllers/photoControllers')
const pageController = require('./controllers/pageControllers')

// connect to db
mongoose.connect("mongodb://localhost/pcat-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// template engine
app.set("view engine", "ejs")

//middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride("_method", {
    methods: ['POST', 'GET']
}))

// routes
app.get("/", photoController.getAllPhotos)
app.get('/photos/:id', photoController.getPhoto)
app.post('/photos', photoController.createPhoto)
app.put('/photos/:id', photoController.updatePhoto)
app.delete('/photos/:id', photoController.deletePhoto)

app.get('/about', pageController.getAboutPage)
app.get("/add", pageController.getAddPage)
app.get('/photos/edit/:id', pageController.getUpdatePage )

app.listen(port)