"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidationRulesFact = exports.insertValidationRulesFact = void 0;
const express_validator_1 = require("express-validator");
const insertValidationRulesFact = () => {
    return [
        (0, express_validator_1.body)("rfc").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 12, max: 13 }).withMessage("Rango incorrecto"),
        (0, express_validator_1.body)("direccion").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 450 }).withMessage("Rango incorrecto"),
        (0, express_validator_1.body)("cfdi").notEmpty().withMessage('El campo CFDI es requerido')
            .isNumeric().withMessage('El CFDI debe ser un valor numérico')
            .isInt({ min: 0, max: 32767 }).withMessage('El CFDI debe estar en el rango de un smallint')
    ];
};
exports.insertValidationRulesFact = insertValidationRulesFact;
const updateValidationRulesFact = () => {
    return [
        (0, express_validator_1.body)("cveFactura").isNumeric().not().isString().withMessage("Formato Incorrecto"),
        (0, express_validator_1.body)("rfc").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 12, max: 13 }).withMessage("Rango incorrecto"),
        (0, express_validator_1.body)("direccion").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 450 }).withMessage("Rango incorrecto"),
        (0, express_validator_1.body)("cfdi").notEmpty().withMessage('El campo CFDI es requerido')
            .isNumeric().withMessage('El CFDI debe ser un valor numérico')
            .isInt({ min: 0, max: 32767 }).withMessage('El CFDI debe estar en el rango de un smallint')
    ];
};
exports.updateValidationRulesFact = updateValidationRulesFact;
