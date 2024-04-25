import { Request, Response } from "express";

class IndexController{
    public index(req: Request, res: Response){
        try{
            return res.json("API is located at /api");
        } catch(error:any){
            return res.status(500).json({message:"Ocurrio un error"});
        }
    }
}
export const indexController = new IndexController();