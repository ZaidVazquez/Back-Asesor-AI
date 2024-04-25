"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRoutes = void 0;
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const jwtCheck_1 = require("../middlewares/jwtCheck");
const usuario_rules_1 = require("../validators/usuario.rules");
const validator_check_1 = require("../middlewares/validator.check");
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // listar
        this.router.get("/", [jwtCheck_1.jwtCheck], usuario_controller_1.usuarioController.listar);
        // Guardar 
        this.router.post("/", (0, usuario_rules_1.insertValidationRules)(), [jwtCheck_1.jwtCheck, validator_check_1.validate], usuario_controller_1.usuarioController.insertar);
        //Actualizar
        this.router.put("/", (0, usuario_rules_1.updateValidationRules)(), [jwtCheck_1.jwtCheck, validator_check_1.validate], usuario_controller_1.usuarioController.actualizar);
        //Eliminar
        this.router.delete("/:cveUsuario", [jwtCheck_1.jwtCheck], usuario_controller_1.usuarioController.eliminar);
    }
}
exports.UsuarioRoutes = UsuarioRoutes;
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
