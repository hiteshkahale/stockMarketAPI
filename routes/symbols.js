const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Symbol, validate} = require('../models/symbol');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const symbols = await Symbol.find().sort('name').select('-previousClose');
  res.send(symbols);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let symbol = await Symbol.findOne({ name: req.body.name });
  if (symbol) return res.status(400).send('Symbol already exist.');

  symbol = new Symbol(_.pick(req.body, ['name', 'description', 'sector', 'previousClose', 'openPrice', 'bidPrice', 'askPrice', 'volume']));
  symbol = await symbol.save();
  
  res.send(symbol);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const symbol = await Symbol.findByIdAndUpdate(req.params.id, 
    _.pick(req.body, ['name', 'description', 'sector', 'previousClose', 'openPrice', 'bidPrice', 'askPrice', 'volume'])
    , {
    new: true
  });

  if (!symbol) return res.status(404).send('The symbol with the given ID was not found.');
  
  res.send(symbol);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const symbol = await Symbol.findByIdAndRemove(req.params.id);

  if (!symbol) return res.status(404).send('The symbol with the given ID was not found.');

  res.send(symbol);
});

router.get('/:id', async (req, res) => {
  const symbol = await Symbol.findById(req.params.id);

  if (!symbol) return res.status(404).send('The symbol with the given ID was not found.');

  res.send(symbol);
});

module.exports = router;