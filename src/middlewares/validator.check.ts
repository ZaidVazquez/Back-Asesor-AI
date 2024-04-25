import { Request, Response,NextFunction } from "express";
import { validationResult } from 'express-validator'

export const validate = (req: Request, res: Response, next: NextFunction) => {
    //Obtener los errores a partir de la petición original
    const errors = validationResult(req);
    //Si no existen errores en la petición continua
    if (errors.isEmpty()) return next();
    //TO DO: Devolver los errores con un estado de petición 400
    console.log(errors)
    return res.status(400).json(errors.array());
}