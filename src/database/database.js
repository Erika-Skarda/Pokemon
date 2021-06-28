const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(process.env.MONGODB_URI || config.MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
},
  err => {
    if(!err) {
      console.log('Connection succeeded!');
    } else {
      console.log('Error in connection: ' + err)
    }
  }
)
require('../models/trade.model');