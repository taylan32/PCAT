const express = require('express')
const app = express()
const port = 5555
const path = require('path')
const ejs = require("ejs")
const mongoose = require('mongoose')
const Photo = require('./models/Photo')
const fileUpload = require('express-fileupload')
const fs = require("fs")

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

// routes
app.get("/", async (req, res) => {

    /*  const result = {
          success: true,
          message: "Photo listed",
          data: {
              id: 1,
              url: "photoUrl"
          }
      }
      res.send(result)
      */


    //  res.sendFile(path.resolve(__dirname, 'views/index.ejs'))

    const photos = await Photo.find({}).sort("-dateCreated")
    res.render("index", {
        photos
    })
})

app.get('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render("photoDetail", { photo })
})

app.get('/about', (req, res) => {
    res.render("about")
})

app.get("/add", (req, res) => {
    res.render("add")
})

app.post('/photos', async (req, res) => {
    console.log(req.files.image)

    // await Photo.create(req.body)
    //res.redirect('/')

    const uploadDir = 'public/uploads'
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }

    let uploadeImage = req.files.image
    let uploadPath = __dirname + "/public/uploads/" + uploadeImage.name

    uploadeImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadeImage.name
        })
        res.redirect("/")
    })

})

app.listen(port)