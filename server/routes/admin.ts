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
        const token = jwt.sign({ id: newAdmin._id, username: newAdmin.username }, Secret, { expiresIn: '1h' });
        res.status(201).send({ token, message: `token generated for user ${newAdmin._id} ` })
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

        const token = jwt.sign({ id: admin._id, username: admin.username }, Secret, { expiresIn: '1h' });
        res.status(201).send({ token, message: `token generated for ${admin._id} ` })
    }

})

router.post("/products", authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, price, imageLink, published } = req.body;
    const newProduct = new Product({ title, description, price, imageLink, published });
    await newProduct.save()
    res.status(200).json({ message: `created ${newProduct._id}` })
})

router.get("/products", authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.find()
    res.status(200).json(product)
})
router.put("/products/:productID", authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
    const productID = req.params.productID
    console.log(productID)
    const product = await Product.findOneAndUpdate({ _id: productID }, {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
        published: req.body.published
    }, { new: true })
    console.log(product)
    if (product) {
        res.status(200).json(product)
    } else {
        res.status(500).json({ message: "no product found" })
    }

})
router.delete("/products", authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
    const productID = req.body.productID

    const product = await Product.findOneAndDelete({ _id: productID })
    if (product) {
        const filteredProducts = await Product.find()
        res.status(200).json(filteredProducts)
    } else {
        res.status(500).json({ message: "no product found" })
    }
})

router.get("/me", authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
    const username = req.headers.username
    console.log(username)
    res.status(201).json(username)
})


export default router 