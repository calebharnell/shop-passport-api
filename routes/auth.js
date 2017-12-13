const express = require('express');
const router = new express.Router();
const { register, signJWTForUser, signIn } = require('../middleware/auth');

// Registration
router.post('/auth/register', register, signJWTForUser);

// Sign In
router.post('/auth', signIn, signJWTForUser)

module.exports = router;
