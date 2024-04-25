"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturaRoutes = void 0;
const express_1 = require("express");
const jwtCheck_1 = require("../middlewares/jwtCheck");
const validator_check_1 = require("../middlewares/validator.check");
const factura_controller_1 = require("../controllers/factura.controller");
const factura_rules_1 = require("../validators/factura.rules");
class FacturaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // listar
        this.router.get("/", [jwtCheck_1.jwtCheck], factura_controller_1.facturaController.listar);
        // Guardar 
        this.router.post("/", (0, factura_rules_1.insertValidationRulesFact)(), [jwtCheck_1.jwtCheck, validator_check_1.validate], factura_controller_1.facturaController.insertar);
        //Actualizar
        this.router.put("/", (0, factura_rules_1.updateValidationRulesFact)(), [jwtCheck_1.jwtCheck, validator_check_1.validate], factura_controller_1.facturaController.actualizar);
        //Eliminar
        this.router.delete("/:cveFactura", [jwtCheck_1.jwtCheck], factura_controller_1.facturaController.eliminar);
    }
}
exports.FacturaRoutes = FacturaRoutes;
const facturaRoutes = new FacturaRoutes();
exports.default = facturaRoutes.router;
