import { body } from "express-validator";

export const insertValidationRules = () => {
    return [
        body("nombre").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min: 3, max: 350}).withMessage("Rango incorrecto"),
        body("apellidos").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min: 3, max: 450}).withMessage("Rango incorrecto"),
    body("username").trim().not().isEmpty().custom(value => !/\s/.test(value)).withMessage("Campo Rerquerido")
    .isLength({min: 3, max: 150}).withMessage("Rango incorrecto"),
    body("password").trim().not().isEmpty().custom(value => !/\s/.test(value)).withMessage("Campo Rerquerido")
    .isLength({min: 3, max: 100}).withMessage("Rango incorrecto"),
    body("email").trim().not().isEmpty().withMessage("Campo Rerquerido")
    .isLength({min: 3, max: 250}).withMessage("Rango incorrecto")
    .isEmail().withMessage("Formato Incorrecto"),
    body("roles").isArray({ min:1 }).withMessage("Formato incorrecto")
    ]
}

export const updateValidationRules = () => {
    return[
        body("cveUsuario").isNumeric().not().isString().withMessage("Formato Incorrecto"),
        body("nombre").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min: 3, max: 350}).withMessage("Rango incorrecto"),
        body("apellidos").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min: 3, max: 450}).withMessage("Rango incorrecto"),
         body("email").trim().not().isEmpty().withMessage("Campo Rerquerido")
        .isLength({min: 3, max: 250}).withMessage("Rango incorrecto")
        .isEmail().withMessage("Formato Incorrecto"),
        body("roles").isArray({ min:1 }).withMessage("Formato incorrecto")
    ]
}