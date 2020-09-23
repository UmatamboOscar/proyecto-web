import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoriaEntity} from "./categoria.entity";
import {CategoriaService} from "./categoria.service";
import {Module} from "@nestjs/common";

@Module(
    {
        controllers:[],
        imports:[
            TypeOrmModule
                .forFeature([
                        CategoriaEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers:[CategoriaService],
        exports:[
            CategoriaService
        ]
    }
)
export class CategoriaModule{

}