const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
    min: 6,
    max: 255
  },
  last_prenom: {
    type: String,
    require: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    require: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 1024
  },
  age: {
    type: Number,
    require: true
  },
  phone_number: {
    type: Number,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  genre: {
    type: String,
    min: 2,
    max: 255
  },
  // creation la relation avec ROle entité 
}, {
  timestamps: true
})

userSchema.index({ location: '2dsphere' })

module.exports = mongoose.model('User', userSchema)
