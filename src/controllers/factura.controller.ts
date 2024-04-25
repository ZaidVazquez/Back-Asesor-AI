import { Request, Response} from 'express'
import dao from '../database/factura.database';
import { utils } from '../utils/utils';


class FacturaController {

    public async listar(req:Request, res:Response) {
        try {
            const token= <string>req.headers["auth"];
            const data = utils.getPayload(token);
            var facturas = await dao.listar(data.cveFactura); //Podemos obtner la informacion del objeto poniendo un punto y la informacion que queremos
            
            return res.json(facturas);
        } catch (error:any) {
            console.log(error);
            return res.status(500).json({mensaje: "Ocurrio un error"});
        }
    }

    public async insertar(req: Request, res: Response){
        try {
            //Segmentar en la informacion del cuerpo de la peticion
            const factura  = req.body;
            

            //Insertar Factura

            const result = await dao.insertar(factura);

            //Insertar roles asignados  
            if (result.affectedRows > 0) {

                return res.json({mensaje: "Factura Registrada correctamente"});

            }else{
                console.log();
                return res.status(500).json({mensaje: "Ocurrio un error"});
            }

            //Devolver un estado

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({mensaje: "Ocurrio un error"});
            
        }
    }

    public async actualizar(req: Request, res: Response){
        try {
            //Segmentar la información
            const { cveFactura, ...factura } = req.body;

            //Actualizar la información del usuario
            const result = await dao.actualizar(factura, cveFactura);
            if(result.affectedRows > 0) {
                return res.json ({mensaje: "Usuario actualizado correctamente"});
            } else{
                return res.status(500).json({mensaje: "Ocurrio un error"})
            }

            res.send(factura);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    public async eliminar(req: Request, res: Response){
        try {
            var cveFactura: number = parseInt(req.params.cveFactura);
            
            // Eliminar al usuario de la tabla tbl_factura
            const result = await dao.eliminar(cveFactura);
            if (result.affectedRows > 0) {
                return res.json({mensaje:"Usuario eliminado correctamente"});
            }else {
                console.log();
                return res.status(500).json({mensaje:"Ocurrio un error aqui"});
            }
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({mensaje: "Ocurrio un error"});
            
        }
    }
    
}

export const facturaController = new FacturaController();