import { JwtPayload } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const createToken = (data: any): string => {
    const token = jwt.sign({ data }, "BIMAT", { algorithm: "HS256", expiresIn: "3s" });
    return token;
}

export const checkToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, "BIMAT") as JwtPayload;
        return decoded;
    } catch (error) {
        return null;
    }
}

export const createRefToken = (data: any): string => {
    const token = jwt.sign({ data }, "KO_BIMAT", { algorithm: "HS256", expiresIn: "7d" });
    return token;
}

export const checkRefToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, "KO_BIMAT") as JwtPayload;
        return decoded;
    } catch (error) {
        return null;
    }
}

export const decodeToken = (token: string): JwtPayload | null => {
    const decoded = jwt.decode(token) as JwtPayload;
    return decoded;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token as string;

    const check = checkToken(token);

    if (check === null) {
        next()
    } else {
        res.status(401).send(check.name)
    }
}
