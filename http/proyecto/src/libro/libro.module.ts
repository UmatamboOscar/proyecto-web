import {LibroEntity} from "./libro.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LibroService} from "./libro.service";
import {LibroController} from "./libro.controller";
import {AutorModule} from "../autor/autor.module";
import {CategoriaModule} from "../categoria/categoria.module";

@Module(
    {
        controllers:[
            LibroController
        ],
        imports:[
            AutorModule,
            CategoriaModule,
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