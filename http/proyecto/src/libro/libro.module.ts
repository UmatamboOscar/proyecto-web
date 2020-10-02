import {LibroEntity} from "./libro.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LibroService} from "./libro.service";
import {LibroController} from "./libro.controller";
import {AutorModule} from "../autor/autor.module";
import {CategoriaModule} from "../categoria/categoria.module";
import {LibroAutorService} from "../libro_autor/libro_autor.service";
import {LibroAutorModule} from "../libro_autor/libro_autor.module";
import {LibroCategoriaModule} from "../libro_categoria/libro_categoria.module";

@Module(
    {
        controllers:[
            LibroController
        ],
        imports:[
            AutorModule,
            CategoriaModule,
            LibroAutorModule,
            LibroCategoriaModule,
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