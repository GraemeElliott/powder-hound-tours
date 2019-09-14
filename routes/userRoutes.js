const express = require('express');
const userController = require('./../controllers/userController');
const authenticationController = require('./../controllers/authenticationController');



const router = express.Router();

router.post('/signup', authenticationController.signup);
router.post('/login', authenticationController.login);
router.get('/logout', authenticationController.logout);
router.post('/forgot-password', authenticationController.forgotPassword);
router.patch('/reset-password/:token', authenticationController.resetPassword);

router.use(authenticationController.protect);

router.patch('/update-password', authenticationController.updatePassword);
router.get(
  '/profile',
  userController.getUserData,
  userController.getUser);
router.patch('/update-profile',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateUserProfile);
router.delete('/delete-profile', userController.deleteUserProfile);

router.use(authenticationController.restrictTo('admin'));

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
