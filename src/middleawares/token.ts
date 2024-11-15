import { Request, Response, NextFunction } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

import { jwtSecret } from "../../credentials";

import { Income } from "../schemas/incomeSchema";

interface AuthRequest extends Request {
    userId?: string;
}

interface TokenPayload extends JwtPayload {
    userId: string;
}

function generateToken(userId: string) {
    return jwt.sign({ userId }, jwtSecret, { expiresIn: "1h" });
}

function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header: ", authHeader); //Debugging

    if (!authHeader) {
        res.status(401).send({ message: "Authorization header is missing!" });
        return;
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token: ", token); //Debugging

    if (!token) {
        res.status(401).send({ message: "Token missing!" });

        return;
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as TokenPayload;
        console.log("Decoded Token Payload: ", decoded);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Token verification failed: ", error);
        res.status(401).send({ message: "Invalid or expired token!" });
    }
}

export { AuthRequest, authMiddleware, generateToken };
