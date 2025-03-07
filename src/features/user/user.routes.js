import express from 'express';
import UserController from './user.controller.js';

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

export default userRoutes;