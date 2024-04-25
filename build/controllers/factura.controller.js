"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facturaController = void 0;
const factura_database_1 = __importDefault(require("../database/factura.database"));
const utils_1 = require("../utils/utils");
class FacturaController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["auth"];
                const data = utils_1.utils.getPayload(token);
                var facturas = yield factura_database_1.default.listar(data.cveFactura); //Podemos obtner la informacion del objeto poniendo un punto y la informacion que queremos
                return res.json(facturas);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ mensaje: "Ocurrio un error" });
            }
        });
    }
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Segmentar en la informacion del cuerpo de la peticion
                const factura = req.body;
                //Insertar Factura
                const result = yield factura_database_1.default.insertar(factura);
                //Insertar roles asignados  
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Factura Registrada correctamente" });
                }
                else {
                    console.log();
                    return res.status(500).json({ mensaje: "Ocurrio un error" });
                }
                //Devolver un estado
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ mensaje: "Ocurrio un error" });
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Segmentar la información
                const _a = req.body, { cveFactura } = _a, factura = __rest(_a, ["cveFactura"]);
                //Actualizar la información del usuario
                const result = yield factura_database_1.default.actualizar(factura, cveFactura);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Usuario actualizado correctamente" });
                }
                else {
                    return res.status(500).json({ mensaje: "Ocurrio un error" });
                }
                res.send(factura);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var cveFactura = parseInt(req.params.cveFactura);
                // Eliminar al usuario de la tabla tbl_factura
                const result = yield factura_database_1.default.eliminar(cveFactura);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Usuario eliminado correctamente" });
                }
                else {
                    console.log();
                    return res.status(500).json({ mensaje: "Ocurrio un error aqui" });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ mensaje: "Ocurrio un error" });
            }
        });
    }
}
exports.facturaController = new FacturaController();
