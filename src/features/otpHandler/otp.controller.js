import { User } from "../user/user.schema.js";
import OtpRepository from "./otp.repository.js";

export default class OtpController {

  constructor() {
    this.otpRepository = new OtpRepository();
  }
  
  async sendOtp(req, res, next) {
    try {
      const { email } = req.body;
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await this.otpRepository.saveOTP(
        email,
        otp,
        new Date(Date.now() + 10 * 60000)
      );
      // Send OTP using email service or SMS service here.
      res.status(201).send("OTP has been sent successfully!");
    } catch (err) {
      next(err);
    }
  }

  async verifyOtp(req, res, next) {
    try {
      const { email, otp } = req.body;
      const otpDetail = await this.otpRepository.findOTP(email, otp);
      if (!otpDetail) {
        return res.status(401).send("Invalid or expired OTP");
      }
      await this.otpRepository.deleteOTP(email);
      res.status(200).send("OTP verified successfully!");
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email, otp, newPassword } = req.body;
      const otpDetail = await this.otpRepository.findOTP(email, otp);
      if (!otpDetail) {
        return res.status(401).send("Invalid or expired OTP");
      }
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await User.findOneAndUpdate({ email }, { password: hashedPassword });
      await this.otpRepository.deleteOTP(email);
      res.status(200).send("Password reset successfully!");
    } catch (err) {
      next(err);
    }
  }
}
