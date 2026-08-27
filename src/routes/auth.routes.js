const express = require('express');

const { register } = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const {registerSchema} = require('../validators/auth.validator');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/register', validate(registerSchema), asyncHandler(register));

module.exports = router;