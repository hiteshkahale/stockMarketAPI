const Joi = require('joi');
const mongoose = require('mongoose');

const Symbol = mongoose.model('Symbol', new mongoose.Schema({
      name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 50
      },
      description: {
        type: String,
        minlength: 5,
        maxlength: 255
      },
      sector: {
        type: String,
        minlength: 2,
        maxlength: 100 
      },
      previousClose: { 
        type: Number, 
        required: true,
        min: 0
      },
      openPrice: { 
        type: Number, 
        required: true,
        min: 0
      },
      bidPrice: { 
        type: Number, 
        required: true,
        min: 0
      },
      askPrice: { 
        type: Number, 
        required: true,
        min: 0
      },
      volume: { 
        type: Number, 
        required: true,
        min: 0
      }
    }));

function validateSymbol(symbol) {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(5).max(255),
    sector: Joi.string().min(2).max(100),
    previousClose: Joi.number().min(0).required(),
    openPrice: Joi.number().min(0).required(),
    bidPrice: Joi.number().min(0).required(),
    askPrice: Joi.number().min(0).required(),
    volume: Joi.number().min(0).required()
  };

  return Joi.validate(symbol, schema);
}

exports.Symbol = Symbol;
exports.validate = validateSymbol;