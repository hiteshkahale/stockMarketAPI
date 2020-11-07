const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://localhost:27017/stockexchange',  { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => winston.info('Connected to stock exchange MongoDB...'))
    .catch(ex => console.error(`Failed to connect db.`, ex));
}