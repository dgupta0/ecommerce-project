import { useState } from "react";
import { useNavigate } from "react-router-dom";
import react from "react"
import { Button, TextField, Card, Typography, Checkbox, FormControlLabel } from '@mui/material';
import axios from "axios"
import path from "../config";

export default function Create() {
    const navigate = useNavigate()
    const item = {
        title: "",
        description: "",
        price: "",
        imageLink: "",
        published: false
    }
    const [product, setProduct] = useState(item)
    function handleInput(e: react.ChangeEvent<HTMLInputElement>) {
        const { name, value, type, checked } = e.target;

        setProduct(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }
    async function handleSubmit() {

        try {
            const token = localStorage.getItem("token")
            const res = await axios.post(`${path}/products`, product, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status == 200) {
                console.log("sucess")
                navigate("/products")
            } else {
                console.log("status sucess")
            }

        } catch (error) {
            console.log(error)
        }


    }
    console.log(product)
    return (
        <Card className="create-product form">
            <Typography textAlign="center" variant="h6">Create Product</Typography>
            <div className="create-page-form">
                <TextField
                    label="product title"
                    variant="outlined"
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={handleInput}
                    placeholder="product title"
                />
                <TextField
                    label="product description"
                    variant="outlined"
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleInput}
                    placeholder="product description"
                />
                <TextField
                    label="product price"
                    variant="outlined"
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleInput}
                    placeholder="product price"
                />
                <TextField
                    label="product image url"
                    variant="outlined"
                    type="text"
                    name="imageLink"
                    value={product.imageLink}
                    onChange={handleInput}
                    placeholder="product image url"
                />
                <FormControlLabel
                    control={<Checkbox
                        name="published"
                        checked={product.published}
                        onChange={handleInput} />}
                    label="Is Product Published?"
                />
                <Button variant="contained" onClick={handleSubmit}>Submit </Button>
            </div>
        </Card>
    )
}