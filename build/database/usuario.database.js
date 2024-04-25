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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../connections/database"));
class UsuarioDatabase {
    listar(cveUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT  cveUsuario, nombre, apellidos, username, email, fechaRegistro "
                    + " FROM tbl_usuario "
                    + "WHERE cveUsuario != ?", [cveUsuario]);
            }));
            return result;
        });
    }
    listarRolByUserId(cveUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT r.cveRol, r.clave, r.nombre "
                    + " FROM tbl_rol_usuario ru "
                    + " JOIN tbl_rol r ON r.cveRol = ru.cveRol "
                    + " WHERE ru.cveUsuario = ? ", [cveUsuario]);
            }));
            return result;
        });
    }
    verificarUsuario(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query("SELECT cveUsuario "
                    + " FROM tbl_usuario "
                    + " WHERE username = ? ", [username]);
            }));
            return result;
        });
    }
    insertar(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" INSERT INTO tbl_usuario SET ? ", [usuario]);
            }));
            return result;
        });
    }
    insertarRol(rol) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" INSERT INTO tbl_rol_usuario SET ? ", [rol]);
            }));
            return result;
        });
    }
    eliminarRolByCveUsuario(cveUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" DELETE FROM tbl_rol_usuario WHERE cveUsuario = ? ", [cveUsuario]);
            }));
            return result;
        });
    }
    actualizar(usuario, cveUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" UPDATE tbl_usuario SET ? WHERE cveUsuario = ? ", [usuario, cveUsuario]);
            }));
            return result;
        });
    }
    eliminar(cveUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" DELETE FROM tbl_usuario WHERE cveUsuario = ? ", [cveUsuario]);
            }));
            return result;
        });
    }
}
const dao = new UsuarioDatabase();
exports.default = dao;
