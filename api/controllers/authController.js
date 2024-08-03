import express from 'express';
import mongoose from 'mongoose';
import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../middleware/errorHandler.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const {name, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
   //console.log("HELLO 1");
    const newUser = new User({name, email, password: hashedPassword});

    try{
        await newUser.save();
        res.status(201).json('User created successfully!');
    }
    catch(error)
    {   
      //  console.log("hello 2");
        next(error);
    }

}

export const signin = async(req,res,next) => {
    const{email, password} = req.body;

    try {
      const validUser = await User.findOne({ email });

      if (!validUser) {
        return next(errorHandler(404, "User Not Found!"));
      }

      const validPassword = bcryptjs.compareSync(password, validUser.password);

      if (!validPassword) {
        return next(errorHandler("401", "Wrong Password!"));
      }

      if (validUser.blacklisted === "true") {
        return next(errorHandler("404", "User is blacklisted!"));
      }

      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = validUser._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
}

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been logged out.");
  } catch (error) {
    next(error);
  }
};