const express = require('express');
const Product = require('../models/Product');
const { requireJWT, verifyAdmin } = require('../middleware/auth')
const router = new express.Router();

router.get('/products', requireJWT, (req, res) => {
  Product.find().then((products) => {
    res.send(products);
  })
  .catch((error) => {
    res.status(500).send({ error: error.message });
  })
});

router.post('/products', requireJWT, /*verifyAdmin, */(req, res) => {
  Product.create({ brandName: req.body.brandName, name: req.body.name})
  .then((product) => {
    res.send(product);
  })
  .catch((error) => {
    res.status(500).send({ error: error.message });
  })
});

router.patch('/products', requireJWT, verifyAdmin, (req, res) => {
  Product.findByIdAndUpdate(req.body._id, { $set: {
    brandName: req.body.brandName,
    name: req.body.name}},
    { new: true }
  )
  .then((product) => {
    res.send(product);
  })
  .catch((error) => {
    res.status(500).send({ error: error.message });
  })
});

router.delete('/products/:id', requireJWT, verifyAdmin, (req, res) => {
  Product.findByIdAndRemove(req.params.id)
  .then((product) => {
    res.send(product);
  })
  .catch((error) => {
    res.status(500).send({ error: error.message });
  })
});

router.get('/products/:id', requireJWT, (req, res) => {
  Product.findById(req.params.id).then((product) => {
    res.send(product);
  })
  .catch((error) => {
    res.status(500).send({ error: error.message });
  })
});

module.exports = router;
