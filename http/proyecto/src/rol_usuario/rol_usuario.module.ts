import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {RolUsuarioEntity} from "./rol_usuario.entity";
import {RolUsuarioService} from "./rol_usuario.service";

@Module(
    {
        controllers:[],
        imports:[
            TypeOrmModule
                .forFeature([
                        RolUsuarioEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers:[
            RolUsuarioService
        ],
        exports:[
            RolUsuarioService
        ]
    }
)
export class RolUsuarioModule{

}