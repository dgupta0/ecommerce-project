import { useEffect, useState } from "react";
import { Grid, Card, CardActions, CardContent, CardMedia, Typography, Button } from "@mui/material";
import axios from "axios";
import path from "../config";

type ProductProps = {
    key: string,
    title: string;
    description: string;
    price: string
    id: string;
    imageLink: string;
}
export default function Products() {
    type Product = {
        _id: string;
        title: string;
        description: string;
        price: string;
        imageLink: string;
    };

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
                />)}
            </Grid>
        </main>
    )
}

function Product(props: ProductProps) {
    function handleDelete(id: string) {
        console.log("delete", id)
    }
    function handleEdit(id: string) {
        console.log("delete", id)
    }
    return (

        <Grid item xs={12} sm={6} md={6} lg={4} >
            <Card sx={{ margin: "auto", alignSelf: "center", boxShadow: "5px 5px 10px #45c09f", }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={props.imageLink}
                    title={props.id}
                />
                <CardContent>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                <CardActions>
                    <Button onClick={() => handleEdit(props.id)} variant="contained" size="small">Edit</Button>
                    <Button style={{ backgroundColor: "#D10000", color: "white", border: "none" }} onClick={() => handleDelete(props.id)} variant="outlined" size="small">Delete</Button>
                </CardActions>
            </Card>
        </Grid>

    )
}