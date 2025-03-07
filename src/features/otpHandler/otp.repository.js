import { ApplicationError } from '../../error-handler/application-error.js';
import OtpS from './otp.schema.js';

export default class OtpRepository {
    async saveOTP (email, otp, expiresAt) {
        try{
            const otpDetails = await OtpS.create({email, otp, expiresAt});
            return otpDetails;
        } catch(err) {
            console.log("Error saving OTP", err);
            throw new ApplicationError("saveOTP - Something went wrong with the database", 500);
        }
    }

    async findOTP(email, otp) {
        try {
            return await OtpS.findOne({email, otp, expiresAt: {$gt: new Date()}})
        } catch(err) {
            console.log("Error finding OTP", err);
            throw new ApplicationError("findOTP - Something went wrong with the database", 500);
        }
    }

    async deleteOTP(email) {
        try{
            return await OtpS.deleteMany({email})
        } catch(err) {
            console.log("Error deleting OTP", err);
            throw new ApplicationError("deleteOTP - Something went wrong with the database", 500);
        }
        
    }
}