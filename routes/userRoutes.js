const express = require('express');
const userController = require('./../controllers/userController');
const authenticationController = require('./../controllers/authenticationController');

const router = express.Router();

router.post('/signup', authenticationController.signup);
router.post('/login', authenticationController.login);

router.post('/forgot-password', authenticationController.forgotPassword);
router.patch('/reset-password/:token', authenticationController.resetPassword);
router.patch('/update-password', authenticationController.protect, authenticationController.updatePassword);
router.patch('/update-profile', authenticationController.protect, userController.updateUserProfile);
router.delete('/delete-profile', authenticationController.protect, userController.deleteUserProfile);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
