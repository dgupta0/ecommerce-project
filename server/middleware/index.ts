import jwt from "jsonwebtoken";
const Secret = "secret"
import { Request, Response, NextFunction } from "express";

type Payload = {
    id: string
} | undefined
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {

    const authHead = req.headers.authorization

    if (!authHead) {

        res.status(401).send("error while getting the auth")
    } else {

        const token = authHead.split(" ")[1]

        jwt.verify(token, Secret, (error, payload: any) => {
            if (error) {
                console.log(error)
            } else {
                console.log(payload)
                req.headers.id = payload.id
                next()
            }
        })
    }
}

export { Secret, authenticateJWT }