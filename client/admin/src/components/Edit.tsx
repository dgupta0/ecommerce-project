import react from "react"
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import path from "../config";
import { Button, TextField, Card, Typography, Checkbox, FormControlLabel, CardMedia } from '@mui/material';


type Product = {
    _id: string;
    title: string;
    description: string;
    price: string;
    imageLink: string;
    published: boolean;
};

export default function Edit() {

    const [editProduct, setEditProduct] = useState<Product>({
        title: "",
        description: "",
        _id: "",
        price: "",
        imageLink: "",
        published: false
    });

    const { id } = useParams();

    useEffect(() => {
        async function setEdit() {
            const token = localStorage.getItem("token")
            const res = await axios.get(`${path}/products`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = res.data
            console.log(data)
            const filteredProduct = data.find((el: Product) => el._id === id)

            console.log(filteredProduct);
            setEditProduct(filteredProduct)


        }
        setEdit()
    }, [])



    return (
        <div className="edit-preview-container">
            <Editor editProduct={editProduct}
                setEditProduct={setEditProduct}
            />
            <Previewer editProduct={editProduct} />

        </div>
    )
}

function Editor({
    editProduct,
    setEditProduct
}: {
    editProduct: Product;
    setEditProduct: React.Dispatch<React.SetStateAction<Product>>;
}) {
    const navigate = useNavigate()
    const { id } = useParams();
    function handleInput(e: react.ChangeEvent<HTMLInputElement>) {
        const { name, value, type, checked } = e.target;

        setEditProduct(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }
    async function saveForEdit() {
        const token = localStorage.getItem("token")
        const res = await axios.put(`${path}/products/${id}`, editProduct, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = res.data;
        console.log(data)
        navigate("/products")
    }
    return (
        <Card className="edit editor">
            <Typography textAlign="center" variant="h6">Edit Product</Typography>
            <div className="create-page-form">
                <TextField
                    label="product title"
                    variant="outlined"
                    type="text"
                    name="title"
                    value={editProduct.title}
                    onChange={handleInput}
                    placeholder="product title"
                />
                <TextField
                    label="product description"
                    variant="outlined"
                    type="text"
                    name="description"
                    value={editProduct.description}
                    onChange={handleInput}
                    placeholder="product description"
                />
                <TextField
                    label="product price"
                    variant="outlined"
                    type="number"
                    name="price"
                    value={editProduct.price}
                    onChange={handleInput}
                    placeholder="product price"
                />
                <TextField
                    label="product image url"
                    variant="outlined"
                    type="text"
                    name="imageLink"
                    value={editProduct.imageLink}
                    onChange={handleInput}
                    placeholder="product image url"
                />
                <FormControlLabel
                    control={<Checkbox
                        name="published"
                        checked={editProduct.published}
                        onChange={handleInput} />}
                    label="Is Product Published?"
                />
                <Button variant="contained" onClick={saveForEdit}> Save </Button>
            </div>
        </Card>
    )
}
function Previewer({ editProduct }: { editProduct: Product }) {
    return (
        <Card className="edit previewer">
            <Typography textAlign="center" variant="h6">Preview Product</Typography>

            <CardMedia
                sx={{ height: 200, objectPosition: "center", objectFit: "cover" }}
                image={editProduct.imageLink}
                title="green iguana"
            />
            <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
                <Typography gutterBottom variant="h5" component="div">
                    {editProduct.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    ${editProduct.price}
                </Typography>
            </div>
            <Typography gutterBottom variant="body2" component="div">
                {editProduct.description}
            </Typography>

        </Card>
    )
}