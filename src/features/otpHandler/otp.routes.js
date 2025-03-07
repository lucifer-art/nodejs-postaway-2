import express from 'express';
import OtpController from './otp.controller.js';

const otpRoutes = express.Router();
const otpController = new OtpController();

otpRoutes.post('/send', (req, res, next) => {
    otpController.sendOtp(req, res, next);
})

otpRoutes.post('/verify', (req, res, next) => {
    otpController.verifyOtp(req, res, next);
})

otpRoutes.post('/reset-password', (req, res, next) => {
    otpController.resetPassword(req, res, next)
})

export default otpRoutes;