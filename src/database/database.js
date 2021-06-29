const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
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