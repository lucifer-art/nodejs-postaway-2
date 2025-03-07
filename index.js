import { ApplicationError } from './src/error-handler/application-error.js';
import express from "express";
import './env.js';
import userRoutes from './src/features/user/user.routes.js';
import otpRoutes from './src/features/otpHandler/otp.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';

const app = express();

app.use(express.json());


//routes
app.use('/api/users', userRoutes);
app.use('/api/otp', jwtAuth, otpRoutes);


//handle errore
app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof ApplicationError) {
        return res.status(err.code).send(err.message);
    }
    res.status(500).send('Something went wrong, please try later');
})


//handles 404 error response
app.use((req, res) => {
    res.status(404).send("API not found. Please check our documentation for more at localhost: 3500/api-docs");
})



export default app;