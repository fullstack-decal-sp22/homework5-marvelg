const express = require('express')
const app = express()
const mongoose = require('mongoose')
const apod = require('./models/apod')

const db = mongoose.connection
const url = "mongodb://127.0.0.1:27017/apod"

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

app.use(express.json())
app.use(express.urlencoded())

const port = process.env.PORT || 3000

app.get("/", function (req, res) {
    // GET "/" should return a list of all APOD images stored in our database
    const lst = [];
    apod.find().exec((error, records) => {
        if(error) {
            res.send(500)
        } else {
            records.forEach((entry) => {
                lst.push(entry.title);
            }) 
            res.send(lst)
        }
    })
    
  });
  
  app.get("/favorite", function (req, res) {
    // GET "/favorite" should return our favorite image by highest rating
    apod.find().sort({'rating': 'desc'}).exec((error, images) => {
        if (error) {
          console.log(error)
          res.send(500)
        } else {
          res.json({favorite: images[0]})
        }
    })
  });
  
  app.post("/add", async function (req, res) {
    // POST "/add" adds an APOD image to our database
    const record = req.body
    console.log(record)

    const response = await apod.create(record)
    console.log(response)

    res.json({status: 'ok'})
  });
  
  app.delete("/delete", async function (req, res) {
    // DELETE "/delete" deletes an image according to the title
    const {title} = req.body
    try {
        const response = await apod.deleteOne({title})
        console.log(response)

        res.json({status: 'ok'})
    } catch(err) {
        console.log(err)
    }

  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})