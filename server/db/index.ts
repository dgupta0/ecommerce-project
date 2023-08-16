import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]

})
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
})

const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
})

const Admin = mongoose.model("Admin", AdminSchema)
const User = mongoose.model("User", UserSchema)
const Product = mongoose.model("Product", ProductSchema)

export { User, Admin, Product }