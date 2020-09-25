import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {LibroAutorEntity} from "./libro_autor.entity";
import {LibroAutorService} from "./libro_autor.service";

@Module(
    {
        controllers:[],
        imports:[
            TypeOrmModule
                .forFeature([
                        LibroAutorEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers:[LibroAutorService],
        exports:[
            LibroAutorService
        ]
    }
)
export class LibroAutorModule{

}