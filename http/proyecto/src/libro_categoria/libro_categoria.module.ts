import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {LibroCategoriaEntity} from "./libro_categoria.entity";
import {LibroCategoriaService} from "./libro_categoria.service";

@Module(
    {
        controllers:[],
        imports:[
            TypeOrmModule
                .forFeature([
                        LibroCategoriaEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers:[LibroCategoriaService],
        exports:[
            LibroCategoriaService
        ]
    }
)
export class LibroCategoriaModule{

}