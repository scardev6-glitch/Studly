const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { signup, login, getMe, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Validation rules
const ALLOWED_SUBJECTS = ['Mathematics', 'Additional Mathematics', 'Biology', 'Chemistry', 'Physics', 'ICT', 'Siswati'];

const signupValidation = [
  body('fullname').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('subjects').isArray({ min: 1 }).withMessage('At least one subject is required'),
  body('subjects.*').isIn(ALLOWED_SUBJECTS).withMessage(`Subjects must be from: ${ALLOWED_SUBJECTS.join(', ')}`),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

const forgotPasswordValidation = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
];

const resetPasswordValidation = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
router.post('/reset-password', resetPasswordValidation, resetPassword);

module.exports = router;
