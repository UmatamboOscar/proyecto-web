import {TypeOrmModule} from "@nestjs/typeorm";
import {AutorEntity} from "./autor.entity";
import {AutorService} from "./autor.service";
import {Module} from "@nestjs/common";
import {AutorController} from "./autor.controller";

@Module(
    {
        controllers:[
            AutorController
        ],
        imports:[
            TypeOrmModule
                .forFeature([
                        AutorEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers:[AutorService],
        exports:[
            AutorService
        ]
    }
)
export class AutorModule{

}