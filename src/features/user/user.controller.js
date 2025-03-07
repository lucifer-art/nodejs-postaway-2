import UserRepository from "./user.repository.js";
import { User } from "./user.schema.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res, next) {
    const { name, email, password, gender } = req.body;
    console.log("sdj,fdjsf", req.body);
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({name, email, password: hashedPassword, gender});
      await this.userRepository.signUp(newUser);
      res.status(200).send(newUser);
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
        const { email, password} = req.body;
        const user = await this.userRepository.findByEmail(email);
        if(!user) {
            return res.status(400).send("Incorrect Credentials");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).send("Incorrect Credentials");
        } else {
            const token = await this.userRepository.tokenSavehandler(user);
            return res.status(200).send(token);
        }
    } catch (err) {
        next(err);
    }
  }

  async logout(req, res, next) {
    try {
        const {token} = req.body;
        const user = await this.userRepository.logout(token);
        if(!user) {
            return res.status(400).send("Invalid token");
        }
        res.status(200).send("Logged out successfully");
    } catch (err) {
        next(err);
    }
  }

  async logoutAllDevices(req, res, next) {
    try {
        const { token } = req.body;
        const user = await this.userRepository.logoutAllDevices(token);
        if(!user) {
            return res.status(400).send("Invalid token");
        }
        res.status(200).send("Logged out from all devices successfully");
    } catch (err) {
        next(err);
    }
  }
}
