const mongoose = require('mongoose')

const Schema = mongoose.Schema
const apodSchema = Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
}, {collection: 'images'})

const APOD = mongoose.model('APOD', apodSchema)

module.exports = APOD