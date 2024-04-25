import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authValidatorRules } from "../validators/auth.rules";
import { validate } from "../middlewares/validator.check";

class AuthRoutes{
    public router: Router;

    constructor() {
        this.router=Router();
        this.config();
    }

    private config(){
        this.router.post("/",authValidatorRules(),[ validate ], authController.login);
    }
}
const authRoutes = new AuthRoutes();
export default authRoutes.router;