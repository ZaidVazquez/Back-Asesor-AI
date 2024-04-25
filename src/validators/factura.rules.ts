import { body } from "express-validator";

export const insertValidationRulesFact = () => {
    return [
        body("rfc").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min: 12, max: 13}).withMessage("Rango incorrecto"),
        body("direccion").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min: 3, max: 450}).withMessage("Rango incorrecto"),
    body("cfdi").notEmpty().withMessage('El campo CFDI es requerido')
    .isNumeric().withMessage('El CFDI debe ser un valor numérico')
    .isInt({ min: 0, max: 32767 }).withMessage('El CFDI debe estar en el rango de un smallint')
    
    
    ]
}

export const updateValidationRulesFact = () => {
    return [
        body("cveFactura").isNumeric().not().isString().withMessage("Formato Incorrecto"),
        body("rfc").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min: 12, max: 13}).withMessage("Rango incorrecto"),
        body("direccion").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min: 3, max: 450}).withMessage("Rango incorrecto"),
    body("cfdi").notEmpty().withMessage('El campo CFDI es requerido')
    .isNumeric().withMessage('El CFDI debe ser un valor numérico')
    .isInt({ min: 0, max: 32767 }).withMessage('El CFDI debe estar en el rango de un smallint')
    
    ]
}