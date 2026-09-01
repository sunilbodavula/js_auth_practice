const express = require('express');

const { register, login, refresh } = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const {registerSchema, loginSchema, refreshSchema} = require('../validators/auth.validator');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/register', validate(registerSchema), asyncHandler(register));
router.post('/login', validate(loginSchema), asyncHandler(login));
router.post('/refresh', validate(refreshSchema), asyncHandler(refresh));

module.exports = router;