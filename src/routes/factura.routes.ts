import { Router } from "express";
import { jwtCheck } from "../middlewares/jwtCheck";
import { validate } from "../middlewares/validator.check";
import { facturaController } from "../controllers/factura.controller";
import { insertValidationRulesFact, updateValidationRulesFact } from "../validators/factura.rules";
    
export class  FacturaRoutes {

        public router:Router;
        constructor() {
            this.router = Router();
            this.config();
        }

        private config() { 
            // listar
            this.router.get("/", [ jwtCheck ], facturaController.listar);
            // Guardar 
            this.router.post("/", insertValidationRulesFact(), [ jwtCheck, validate ], facturaController.insertar);
            //Actualizar
            this.router.put("/", updateValidationRulesFact(), [jwtCheck, validate], facturaController.actualizar);
            //Eliminar
            this.router.delete("/:cveFactura", [jwtCheck], facturaController.eliminar);
        }
}
const facturaRoutes = new FacturaRoutes();
export default facturaRoutes.router;
