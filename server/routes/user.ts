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
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, Secret, { expiresIn: '1h' });
        res.status(201).send({ token, message: `token generated for ${newUser._id} ` })
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
        const token = jwt.sign({ id: user._id, username: user.username }, Secret, { expiresIn: '1h' });
        res.status(200).send({ token, message: `token generated for user ${user._id} ` })
    }
})
router.get("/products", authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.find()
    res.status(201).json(product)
})

router.post("/products/:productID", authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers.id;
    console.log(req.headers.id)
    const productID = req.params.productID
    const product = await Product.findById(productID);
    const user = await User.findById(userId)
    if (!product) {
        res.status(404).send("product not found")
        return
    }
    if (!user) {
        res.status(404).send("user not found")
        return
    }
    const productObjectId = mongoose.Types.ObjectId.createFromHexString(productID);
    user.purchasedProducts.push(productObjectId);
    await user.save()
    res.status(200).json({ message: "product purchased sucessfully" })

})
router.get("/cart", authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers.id;
    const user = await User.findById(userId).populate("purchasedProducts")
    if (user) {
        res.status(200).json(user.purchasedProducts)
    } else {
        res.status(400).send("user not found")
    }
})
router.delete("/cart", authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers.id;
    const productID = req.body.productID
    const user = await User.findById(userId)
    if (!user) {
        res.status(404).send("user not found")
        return
    }
    const filterProducts = user.purchasedProducts.filter(id => {
        console.log(id !== productID, id, productID)
        if (id.toString() !== productID) {
            return id
        }
    })
    console.log(filterProducts)
    user.purchasedProducts = filterProducts;
    await user.save()
    res.status(200).send("product deleted successfully")
})
router.get("/me", authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
    const username = req.headers.username
    console.log(username)
    res.status(201).json(username)
})
export default router 