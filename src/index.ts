import express, {Application} from 'express'
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/index.routes';
import authRoutes from './routes/auth.routes';
import usuarioRoutes from './routes/usuario.routes';
import facturaRoutes from './routes/factura.routes';

class Server{
    public app: Application = express();
    constructor(){
        this.config();
        this.routes();
    }
    private config(){
        //realizar la configuracion del puerto
        this.app.set("port", process.env.PORT || 3000);

        //mostrar las peticiones en la terminal (Morgan)
        this.app.use(morgan("dev"));

        //configurar el intercambio de recursos de origen
        this.app.use(cors());

        //configurar la entrada de datos por medio de las peticiones (json)
        this.app.use(express.json());

        //deshabilitar la opcion de envio de URL corruptas
        this.app.use(express.urlencoded({extended:false}));
     }
     public start():void{
        //agregar un listener con un callback para ejecutar el servicio
        this.app.listen(this.app.get("port"), ()  => {});
        console.log(`Server on port ${this.app.get("port")}`);
     }

    private routes(){ 
        this.app.use("/", indexRoutes);
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api/usuario", usuarioRoutes);
        this.app.use("/api/factura", facturaRoutes);
    }
}
const server = new Server();
server.start();