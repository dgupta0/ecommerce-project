import mongoose from "mongoose";
import express from "express";
import { Secret, authenticateJWT } from "../middleware";
const router = express.Router()
import { Request, Response, NextFunction } from "express";
import { Admin, Product } from "../db";
import jwt from "jsonwebtoken";


router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    console.log(req.body)
    const admin = await Admin.findOne({ username })
    if (admin) {
        res.status(400).send("admin already exists")
    } else if (!username || !password) {
        res.status(411).send("please enter both username and password")
    } else {
        const newObj = { username, password }
        const newAdmin = new Admin(newObj)
        await newAdmin.save()
        // const currentAdmin = await Admin.findOne({  username })
        const token = jwt.sign({ id: newAdmin._id }, Secret, { expiresIn: '1h' });
        res.status(200).send({ token, message: `token generated for user ${newAdmin._id} ` })
    }
})
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username })
    if (!admin) {
        res.status(400).send("admin doesn't already exists")
    } else if (!username || !password) {
        res.status(411).send("please enter both username and password")
    } else {
        // const currentAdmin = await Admin.findOne({  username })
        const token = jwt.sign({ id: admin._id }, Secret, { expiresIn: '1h' });
        res.status(200).send({ token, message: `token generated for ${admin._id} ` })
    }
})
export default router 