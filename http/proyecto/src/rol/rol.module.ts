import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {RolEntity} from "./rol.entity";
import {RolService} from "./rol.service";

@Module(
    {
        controllers:[],
        imports:[
            TypeOrmModule
                .forFeature([
                        RolEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers:[RolService],
        exports:[
            RolService
        ]
    }
)
export class RolModule{

}