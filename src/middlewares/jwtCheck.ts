import { NextFunction, Request, Response } from "express";
import { utils } from "../utils/utils";
import jwt from 'jsonwebtoken';
import keys from "../config/keys";

export const jwtCheck = (req: Request, res: Response, next: NextFunction) => {
    try {
        //Obtener JWT de la petición
        const token = <string>req.headers["auth"]
        //Obtener el payload
        let payload = utils.getPayload(token);

        // Generar y enviar el nuevo token de auth
        const newToken = jwt.sign(payload, keys.secret.jwt, { expiresIn: '1h'});
        // Agregar el nuevo JWT a la petición
        res.setHeader("auth", newToken);

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send("No autorized");

    }
}