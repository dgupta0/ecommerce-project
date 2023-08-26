import { useEffect, useState } from "react";
import { Grid, Card, CardActions, CardContent, CardMedia, Typography, Button } from "@mui/material";
import axios from "axios";
import path from "../config";
import { useNavigate } from "react-router-dom";

type Product = {
    _id: string;
    title: string;
    description: string;
    price: string;
    imageLink: string;
};

type ProductProps = {
    key: string,
    title: string;
    description: string;
    price: string
    id: string;
    imageLink: string;
    setData: React.Dispatch<React.SetStateAction<Product[]>>
}
export default function Products() {
    const [data, setData] = useState<Product[]>([]);
    useEffect(() => {
        const token = localStorage.getItem("token")
        async function getProducts() {
            const res = await axios.get(`${path}/products`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(res.data)
        }
        getProducts()
    }, [])

    return (
        <main style={{ padding: "2rem" }}>
            <Grid container spacing={4} >
                {data.map(p => <Product
                    key={p._id}
                    title={p.title}
                    description={p.description}
                    price={p.price}
                    id={p._id}
                    imageLink={p.imageLink}
                    setData={setData}
                />)}
            </Grid>
        </main>
    )
}

function Product(props: ProductProps) {
    const navigate = useNavigate()
    async function handleDelete(productID: string) {
        const token = localStorage.getItem("token")
        const res = await axios.delete(`${path}/products`, {
            data: { productID },
            headers: {
                Authorization: `Bearer ${token}`

            }
        })
        props.setData(res.data)
    }
    function handleEdit(id: string) {
        navigate(`/products/${id}`)
    }
    return (

        <Grid item xs={12} sm={6} md={6} lg={4} >
            <Card sx={
                {
                    margin: "auto",
                    alignSelf: "center",
                    boxShadow: "5px 5px 10px #45c09f",
                    height: "99%", width: "99%",
                    display: "grid"
                }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={props.imageLink}
                    title={props.id}
                />
                <CardContent>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.title}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            ${props.price}
                        </Typography>
                    </div>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions style={{ alignSelf: "flex-end" }}>
                    <Button onClick={() => handleEdit(props.id)} variant="contained" size="small">Edit</Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(props.id)} size="small">Delete</Button>
                </CardActions>
            </Card>
        </Grid>

    )
}