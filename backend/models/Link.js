const mongoose = require('mongoose')


const LinkSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      require: true
    },
    target: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: true
    }
  }
)

module.exports = mongoose.model('Link', LinkSchema)
