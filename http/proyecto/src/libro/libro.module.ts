import {LibroEntity} from "./libro.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LibroService} from "./libro.service";
import {LibroController} from "./libro.controller";

@Module(
    {
        controllers:[
            LibroController
        ],
        imports:[
            TypeOrmModule
                .forFeature([
                        LibroEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers:[LibroService],
        exports:[
            LibroService
        ]
    }
)
export class LibroModule{

}