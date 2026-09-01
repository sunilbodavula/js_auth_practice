const express = require('express');

const { register, login } = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const {registerSchema, loginSchema} = require('../validators/auth.validator');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/register', validate(registerSchema), asyncHandler(register));
router.post('/login', validate(loginSchema), asyncHandler(login));

module.exports = router;