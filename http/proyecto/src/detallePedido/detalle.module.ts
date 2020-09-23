import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {DetalleEntity} from "./detalle.entity";
import {DetalleService} from "./detalle.service";

@Module(
    {
        controllers:[],
        imports:[
            TypeOrmModule
                .forFeature([
                        DetalleEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers:[DetalleService],
        exports:[
            DetalleService
        ]
    }
)
export class DetalleModule{

}