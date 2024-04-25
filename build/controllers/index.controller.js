"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        try {
            return res.json("API is located at /api");
        }
        catch (error) {
            return res.status(500).json({ message: "Ocurrio un error" });
        }
    }
}
exports.indexController = new IndexController();
