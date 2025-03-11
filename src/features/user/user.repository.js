import { ApplicationError } from "../../error-handler/application-error.js";
import { User } from "./user.schema.js";
import jwt from 'jsonwebtoken';

export default class UserRepository {
  async signUp(user) {
    try {
      const newUser = user;
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log("Error sigining", err);
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        throw new ApplicationError(
          "Signup - Something went wrong with the database",
          500
        );
      }
    }
  }

  async findByEmail(email) {
    try {
        return await User.findOne({email});
    } catch (err) {
        console.log("Error signing in", err);
        throw new ApplicationError("Sign in - Something went wrong with the database", 500);
    }
  }

  async tokenSavehandler(user) {
    try {
        const token = jwt.sign(
            {
                userID: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            }
        )
        user.tokens.push(token);
        user.save();
        console.log("hfgdghsjf", token);
        return token;
    } catch(err) {
        console.log("Error saving token", err);
        throw new ApplicationError("Token save - Something went wrong with the database", 500);
    }
  }

  async logout(token) {
    try {
        const user = await User.findOne({tokens: token});
        user.tokens = user.tokens.filter(t => t !== token);
        await user.save();
        return user;
    } catch (err) {
        console.log("Error logging out", err);
        throw new ApplicationError("Logout - Something went wrong with the database", 500);
    }
  }

  async logoutAllDevices(token) {
    try {
        const user = await User.findOne({tokens: token});
        if(user) {
            user.tokens = [];
            await user.save();
            return user;
        } else {
            return -1;
        }
    } catch (err) {
        console.log("Error logging out all devices", err);
        throw new ApplicationError("Logout all devices - Something went wrong with the database", 500);
    }
  }

  async getUserById(id) {
    try {
      const user  = await User.findById(id).select('-password -tokens');
      return user;
    } catch (err) {
      console.log("Error getting user by id", err);
      throw new ApplicationError("Get user by id - Something went wrong with the database", 500);
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find().select('-password -tokens');
      return users;
    } catch (err) {
      console.log("Error getting all users", err);
      throw new ApplicationError("Get all users - Something went wrong with the database", 500);
    }
  }

  async updateUser(id, updatedData) {
    try {
      const user = await User.findByIdAndUpdate(id, updatedData, {new: true}).select('-password -tokens');
      return user;
    } catch (err) {
      console.log("Error updating user", err);
      throw new ApplicationError("Update user - Something went wrong with the database", 500);
    }
  }
}
