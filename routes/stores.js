const express = require('express');
const Store = require('../models/Store');
const router = new express.Router();


router.get('/stores', (req, res) => {
  Store.find().then((stores) => {
    res.send(stores);
  })
  .catch((error) => {
    res.status(500).send({ error: error.message });
  })
});

module.exports = router;
