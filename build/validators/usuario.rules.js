"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidationRules = exports.insertValidationRules = void 0;
const express_validator_1 = require("express-validator");
const insertValidationRules = () => {
    return [
        (0, express_validator_1.body)("nombre").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 350 }).withMessage("Rango incorrecto"),
        (0, express_validator_1.body)("apellidos").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 450 }).withMessage("Rango incorrecto"),
        (0, express_validator_1.body)("username").trim().not().isEmpty().custom(value => !/\s/.test(value)).withMessage("Campo Rerquerido")
            .isLength({ min: 3, max: 150 }).withMessage("Rango incorrecto"),
        (0, express_validator_1.body)("password").trim().not().isEmpty().custom(value => !/\s/.test(value)).withMessage("Campo Rerquerido")
            .isLength({ min: 3, max: 100 }).withMessage("Rango incorrecto"),
        (0, express_validator_1.body)("email").trim().not().isEmpty().withMessage("Campo Rerquerido")
            .isLength({ min: 3, max: 250 }).withMessage("Rango incorrecto")
            .isEmail().withMessage("Formato Incorrecto"),
        (0, express_validator_1.body)("roles").isArray({ min: 1 }).withMessage("Formato incorrecto")
    ];
};
exports.insertValidationRules = insertValidationRules;
const updateValidationRules = () => {
    return [
        (0, express_validator_1.body)("cveUsuario").isNumeric().not().isString().withMessage("Formato Incorrecto"),
        (0, express_validator_1.body)("nombre").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 350 }).withMessage("Rango incorrecto"),
        (0, express_validator_1.body)("apellidos").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 450 }).withMessage("Rango incorrecto"),
        (0, express_validator_1.body)("email").trim().not().isEmpty().withMessage("Campo Rerquerido")
            .isLength({ min: 3, max: 250 }).withMessage("Rango incorrecto")
            .isEmail().withMessage("Formato Incorrecto"),
        (0, express_validator_1.body)("roles").isArray({ min: 1 }).withMessage("Formato incorrecto")
    ];
};
exports.updateValidationRules = updateValidationRules;
