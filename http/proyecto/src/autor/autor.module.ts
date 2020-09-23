import {TypeOrmModule} from "@nestjs/typeorm";
import {AutorEntity} from "./autor.entity";
import {AutorService} from "./autor.service";
import {Module} from "@nestjs/common";

@Module(
    {
        controllers:[],
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