import { Request, Response} from 'express'
import dao from '../database/usuario.database';
import { utils } from '../utils/utils';


class UsuarioController {

    public async listar(req:Request, res:Response) {
        try {
            const token= <string>req.headers["auth"];
            const data = utils.getPayload(token);
            var usuarios = await dao.listar(data.cveUsuario); //Podemos obtner la informacion del objeto poniendo un punto y la informacion que queremos
            for (let usuario of usuarios){
                usuario.roles = await dao.listarRolByUserId(usuario.cveUsuario)
            }
            return res.json(usuarios);
        } catch (error:any) {
            console.log(error);
            return res.status(500).json({mensaje: "Ocurrio un error"});
        }
    }

    public async insertar(req: Request, res: Response){
        try {
            //Segmentar en la informacion del cuerpo de la peticion
            const {  roles, ...usuario } = req.body;
            //Verificar si el usuario existe
            const users= await dao.verificarUsuario(usuario.username);
            if (users.length > 0){
                return res.status(404).json({mensaje: "Elegir otro nombre de usuario"})
            }
            //encriptar contraseña
            var encryptedPassword = await utils.hashPassword(usuario.password);
            usuario.password = encryptedPassword;

            //Insertar usuario

            const result = await dao.insertar(usuario);

            //Insertar roles asignados  
            if (result.affectedRows > 0) {
                for (let rol of roles){
                    var insertRol = {
                        cveRol: rol,
                        cveUsuario: result.insertId
                    } 
                    await dao.insertarRol(insertRol);
                }
                return res.json({mensaje: "Usuario Registrado correctamente"});

            }else{
                return res.status(500).json({mensaje: "Ocurrio un error"});
            }

            //Devolver un estado

        } catch (error: any) {
            return res.status(500).json({mensaje: "Ocurrio un error"});
            
        }
    }

    public async actualizar(req: Request, res: Response){
        try {
            //Segmentar la información
            const { roles, cveUsuario, ...usuario } = req.body;

            //Eliminar los roles existentes y e insertar los nuevos roles asignados
            const resultRoles = await dao.eliminarRolByCveUsuario(cveUsuario);
            for(let rol of roles) {
                var updateRol = {
                    cveRol: rol,
                    cveUsuario: cveUsuario
                }

                await dao.insertarRol(updateRol)
            }

            //Actualizar la información del usuario
            const result = await dao.actualizar(usuario, cveUsuario);
            if(result.affectedRows > 0) {
                return res.json ({mensaje: "Usuario actualizado correctamente"});
            } else{
                return res.status(500).json({mensaje: "Ocurrio un error"})
            }

            res.send(usuario);
        } catch (error: any) {
            return res.status(500).json({mensaje: "Ocurrio un error"});
            
        }
    }

    public async eliminar(req: Request, res: Response){
        try {
            var cveUsuario: number = parseInt(req.params.cveUsuario);

            // Eliminar de la tabla tbl_rol_usuario
            await dao.eliminarRolByCveUsuario(cveUsuario);
            // Eliminar al usuario de la tabla tbl_usuario
            const result = await dao.eliminar(cveUsuario);
            if (result.affectedRows > 0) {
                return res.json({mensaje:"Usuario eliminado correctamente"});
            }else {
                return res.status(500).json({mensaje:"Ocurrió un error"});
            }
        } catch (error: any) {
            return res.status(500).json({mensaje: "Ocurrio un error"});
            
        }
    }
    
}

export const usuarioController = new UsuarioController();