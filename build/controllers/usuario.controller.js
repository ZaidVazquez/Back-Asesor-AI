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
exports.usuarioController = void 0;
const usuario_database_1 = __importDefault(require("../database/usuario.database"));
const utils_1 = require("../utils/utils");
class UsuarioController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["auth"];
                const data = utils_1.utils.getPayload(token);
                var usuarios = yield usuario_database_1.default.listar(data.cveUsuario); //Podemos obtner la informacion del objeto poniendo un punto y la informacion que queremos
                for (let usuario of usuarios) {
                    usuario.roles = yield usuario_database_1.default.listarRolByUserId(usuario.cveUsuario);
                }
                return res.json(usuarios);
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
                const _a = req.body, { roles } = _a, usuario = __rest(_a, ["roles"]);
                //Verificar si el usuario existe
                const users = yield usuario_database_1.default.verificarUsuario(usuario.username);
                if (users.length > 0) {
                    return res.status(404).json({ mensaje: "Elegir otro nombre de usuario" });
                }
                //encriptar contraseña
                var encryptedPassword = yield utils_1.utils.hashPassword(usuario.password);
                usuario.password = encryptedPassword;
                //Insertar usuario
                const result = yield usuario_database_1.default.insertar(usuario);
                //Insertar roles asignados  
                if (result.affectedRows > 0) {
                    for (let rol of roles) {
                        var insertRol = {
                            cveRol: rol,
                            cveUsuario: result.insertId
                        };
                        yield usuario_database_1.default.insertarRol(insertRol);
                    }
                    return res.json({ mensaje: "Usuario Registrado correctamente" });
                }
                else {
                    return res.status(500).json({ mensaje: "Ocurrio un error" });
                }
                //Devolver un estado
            }
            catch (error) {
                return res.status(500).json({ mensaje: "Ocurrio un error" });
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Segmentar la información
                const _a = req.body, { roles, cveUsuario } = _a, usuario = __rest(_a, ["roles", "cveUsuario"]);
                //Eliminar los roles existentes y e insertar los nuevos roles asignados
                const resultRoles = yield usuario_database_1.default.eliminarRolByCveUsuario(cveUsuario);
                for (let rol of roles) {
                    var updateRol = {
                        cveRol: rol,
                        cveUsuario: cveUsuario
                    };
                    yield usuario_database_1.default.insertarRol(updateRol);
                }
                //Actualizar la información del usuario
                const result = yield usuario_database_1.default.actualizar(usuario, cveUsuario);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Usuario actualizado correctamente" });
                }
                else {
                    return res.status(500).json({ mensaje: "Ocurrio un error" });
                }
                res.send(usuario);
            }
            catch (error) {
                return res.status(500).json({ mensaje: "Ocurrio un error" });
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var cveUsuario = parseInt(req.params.cveUsuario);
                // Eliminar de la tabla tbl_rol_usuario
                yield usuario_database_1.default.eliminarRolByCveUsuario(cveUsuario);
                // Eliminar al usuario de la tabla tbl_usuario
                const result = yield usuario_database_1.default.eliminar(cveUsuario);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Usuario eliminado correctamente" });
                }
                else {
                    return res.status(500).json({ mensaje: "Ocurrió un error" });
                }
            }
            catch (error) {
                return res.status(500).json({ mensaje: "Ocurrio un error" });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
