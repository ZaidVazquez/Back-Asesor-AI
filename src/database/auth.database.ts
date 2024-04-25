import pool from "../connections/database";

class AuthDatabase {
    public async getUserByUsername(username: string){
        const result = await pool.then(async (connection) => {
            return await connection.query("SELECT * FROM tbl_usuario WHERE username = ? ", [username]);
        });
        return result;
    }


public async getRolByCveUsuario(cveUsuario: number){
    const result = await pool.then(async (connection) => {
        return await connection.query(" SELECT r.cveRol, r.nombre, r.clave "
            +" FROM tbl_rol_usuario ru "
            +" JOIN tbl_rol r ON ru.cveRol = r.cveRol "
            +" WHERE ru.cveUsuario = ? AND r.estatus = ? ", 
            [ cveUsuario, true ]
        );
    });
    return result;
}

}
const dao = new AuthDatabase();
export default dao;