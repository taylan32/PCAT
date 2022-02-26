const mongoose = require('mongoose')
const Schema = mongoose.Schema

//connect to db
mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//create a schema
const photoSchema = new Schema({
    title: String,
    description: String
})

// model
const photo = mongoose.model('Photo', photoSchema)

/*
// create a photo
photo.create({
    title: "Photo title 2",
    description: "Photo description 2"
})

*/

/*
// read data
photo.find({}, (error, data) => {
    if(error) {
        console.log(error)
    }
    console.log(data)
})
*/

/*
// update data
const id = "6218b0aa3da19db84a85c952"
photo.findByIdAndUpdate(id, {
    title: "Photo title 1 updated",
    description: "Photo description 1 updated"
}, 
{
    new:true
},
(error, data) => {
    console.log(data)
})
*/
/*
// delete data
const id = "6218b2976c8940c04f807d4a"
photo.findByIdAndDelete(id, (error, data) => {
    console.log("Photo is removed")
})
*/
