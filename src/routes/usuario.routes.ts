import { Router } from "express";
import { usuarioController } from '../controllers/usuario.controller'
import { jwtCheck } from "../middlewares/jwtCheck";
import { insertValidationRules, updateValidationRules } from "../validators/usuario.rules";
import { validate } from "../middlewares/validator.check";
    
export class  UsuarioRoutes {

        public router:Router;
        constructor() {
            this.router = Router();
            this.config();
        }

        private config() { 
            // listar
            this.router.get("/", [ jwtCheck ], usuarioController.listar);
            // Guardar 
            this.router.post("/", insertValidationRules(), [ jwtCheck, validate ], usuarioController.insertar);
            //Actualizar
            this.router.put("/", updateValidationRules(), [jwtCheck, validate], usuarioController.actualizar);
            //Eliminar
            this.router.delete("/:cveUsuario", [jwtCheck], usuarioController.eliminar);
        }
}
const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;
