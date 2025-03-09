import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from './../../middlewares/jwt.middleware.js'
import { upload } from '../../middlewares/fileUpload.middleware.js';

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post('/signup', (req, res, next) => {
    userController.signUp(req, res, next);
})

userRoutes.post('/signin', (req, res, next) => {
    userController.signIn(req, res, next);
})

userRoutes.post('/logout', (req, res, next) => {
    userController.logout(req, res, next);
})

userRoutes.post('/logoutAllDevices', (req, res, next) => {
    userController.logoutAllDevices(req, res, next);
})

userRoutes.get('/get-details/:userId',jwtAuth, (req, res, next) => {
    userController.fetchUserProfile(req, res, next);
})

userRoutes.get('/get-all-details', jwtAuth, (req, res, next) => {
    userController.fetchAllUsers(req, res, next);
})

userRoutes.put('/update-details/:userId', jwtAuth, upload.single('avatar'), (req, res, next) => {
    userController.updateUserProfile(req, res, next);
})

export default userRoutes;