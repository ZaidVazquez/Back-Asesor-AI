import { createVerify } from "crypto";
import pool from "../connections/database";

class FacturaDatabase {

    public async listar (cveFactura: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " SELECT  cveFactura, rfc, direccion, cfdi, fechaRegistro "
                + " FROM tbl_factura ",
                [cveFactura]
            )
        });
        return result;
    }



    public async insertar(factura: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " INSERT INTO tbl_factura SET ? ",
                [ factura ]
            )
        });
        return result;
    }

    public async actualizar(factura: any, cveFactura: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " UPDATE tbl_factura SET ? WHERE cveFactura = ? ",
                [ factura, cveFactura]
            )
        });
        return result;
    }

    public async eliminar(cveFactura: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " DELETE FROM tbl_factura WHERE cveFactura = ? ",
                [cveFactura]
            )
        });
        return result;
    }


}

const dao = new FacturaDatabase();
export default dao;