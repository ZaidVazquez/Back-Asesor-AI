import { body } from 'express-validator';

export const authValidatorRules = () => {
    return [
        body("username").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 150}).withMessage("Rango incorrecto"),
        body("password").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 100}).withMessage("Rango incorrecto")

    ]
}
