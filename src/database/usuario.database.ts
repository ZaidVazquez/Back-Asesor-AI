import { createVerify } from "crypto";
import pool from "../connections/database";

class UsuarioDatabase {

    public async listar (cveUsuario: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " SELECT  cveUsuario, nombre, apellidos, username, email, fechaRegistro "
                + " FROM tbl_usuario "
                + "WHERE cveUsuario != ?",
                [cveUsuario]
            )
        });
        return result;
    }

    public async listarRolByUserId (cveUsuario: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " SELECT r.cveRol, r.clave, r.nombre "
                + " FROM tbl_rol_usuario ru "
                + " JOIN tbl_rol r ON r.cveRol = ru.cveRol "
                + " WHERE ru.cveUsuario = ? ",
                [cveUsuario]
            )
        });
        return result;
    }

    public async verificarUsuario (username: string) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                "SELECT cveUsuario "
                + " FROM tbl_usuario "
                + " WHERE username = ? ",
                [ username ]
            )
        });
        return result;
    }

    public async insertar(usuario: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " INSERT INTO tbl_usuario SET ? ",
                [ usuario]
            )
        });
        return result;
    }

    public async insertarRol(rol: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " INSERT INTO tbl_rol_usuario SET ? ",
                [ rol ]
            )
        });
        return result;
    }

    public async eliminarRolByCveUsuario(cveUsuario: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " DELETE FROM tbl_rol_usuario WHERE cveUsuario = ? ",
                [ cveUsuario]
            )
        });
        return result;
    }

    public async actualizar(usuario: any, cveUsuario: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " UPDATE tbl_usuario SET ? WHERE cveUsuario = ? ",
                [ usuario, cveUsuario]
            )
        });
        return result;
    }

    public async eliminar(cveUsuario: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " DELETE FROM tbl_usuario WHERE cveUsuario = ? ",
                [cveUsuario]
            )
        });
        return result;
    }


}

const dao = new UsuarioDatabase();
export default dao;