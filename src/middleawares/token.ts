import { Request, Response, NextFunction } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

import { jwtSecret } from "../../credentials";

import { Income } from "../schemas/incomeSchema";

interface AuthRequest extends Request {
    userId?: string;
}

// interface TokenPayload extends JwtPayload {

//     userId: string;

// }

function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).send({ message: "Couldn't get token" });

        return;
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        if (typeof decoded === "object") {
            req.userId = (decoded as JwtPayload).userId;
        } else {
            req.userId = decoded;
        }

        next();
    } catch (error) {
        res.status(401).send({ message: "Invalid token!" });
    }
}

export { AuthRequest, authMiddleware };
