import { Request, Response } from "express";
import dao from "../database/auth.database";
import { utils } from "../utils/utils";

class AuthController{
    public async login(req: Request, res: Response){
        try{
          //Se obtienen los valores del body
            var {username,password} =  req.body;
            const users = await dao.getUserByUsername(username);
            
            

            //bcryptjs jsonwebtoken express-validator

            //verificación de usuario
            if (users.length <= 0) return res.status(400).json({ mensaje : "El usuario y/o contraseña es incorrecto"})

            // TODO: obtener la informacion de los uauarios a partir de su "username"
            
            // TODO: Realizar un ciclo "for" para obtener la informacion
            for (let user of users) {
            // TO DO: Validar la contraseña
            if(await utils.checkPassword(password, user.password)){
                //TO DO: obtener los roles del usuario
                const roles = await dao.getRolByCveUsuario(user.cveUsuario);
                user.roles = roles;
                //crear un model con la informacion necesaria
                const { password, fechaRegistro, ...newUser } = user;
                //Generar un JWT (JsonWebToken) - Auth
                var token = utils.generateJWT(newUser);
                //TO DO: Devolver la información
                return res.json({token, mensaje: 'Autenticación correcta'});
            }else{
                return res.status(400).json({ mensaje: "El usuario y/o contraseña es incorrecto"})
            }

          
            }

        } catch(error:any){
            console.log(error);
            return res.status(500).json({message:"Ocurrio un error"});
        }
    }
}
export const authController = new AuthController();
