import mongoose from "mongoose";
import express from "express";
import { Secret, authenticateJWT } from "../middleware";
const router = express.Router()
import { Request, Response, NextFunction } from "express";
import { User, Product } from "../db";
import jwt from "jsonwebtoken";


router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    console.log(req.body)
    const user = await User.findOne({ username })
    if (user) {
        res.status(400).send("user already exists")
    } else if (!username || !password) {
        res.status(411).send("please enter both username and password")
    } else {
        const newObj = { username, password }
        const newUser = new User(newObj)
        await newUser.save()
        // const currentuser = await user.findOne({  username })
        const token = jwt.sign({ id: newUser._id }, Secret, { expiresIn: '1h' });
        res.status(200).send({ token, message: `token generated for ${newUser._id} ` })
    }
})
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    if (!user) {
        res.status(400).send("user doesn't already exists")
    } else if (!username || !password) {
        res.status(411).send("please enter both username and password")
    } else {
        const token = jwt.sign({ id: user._id }, Secret, { expiresIn: '1h' });
        res.status(200).send({ token, message: `token generated for user ${user._id} ` })
    }
})
export default router 