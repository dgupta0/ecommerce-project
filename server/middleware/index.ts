import jwt from "jsonwebtoken";
const Secret = "secret"
import { Request, Response, NextFunction } from "express";

type Payload = {
    id: string
} | undefined
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    console.log("headers", req.headers.authorization)
    const authHead = req.headers.authorization
    if (!authHead) {
        res.status(401).send("error while getting the auth")
    } else {
        const token = authHead.split(" ")[1]
        console.log(token)
        jwt.verify(token, Secret, (error, payload: any) => {
            if (error) {
                console.log(error)
            } else {
                console.log("payload", payload)
                req.headers.id = payload.id
                req.headers.username = payload.username
                next()
            }
        })
    }
}

export { Secret, authenticateJWT }