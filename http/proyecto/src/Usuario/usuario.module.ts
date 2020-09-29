import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {RolUsuarioModule} from "../rol_usuario/rol_usuario.module";
import {RolModule} from "../rol/rol.module";

@Module(
    {
        controllers:[
            UsuarioController
        ],
        imports:[
            RolModule,
            RolUsuarioModule,
            TypeOrmModule
                .forFeature([
                    UsuarioEntity
                ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers:[
            UsuarioService
        ]
    }
)
export class UsuarioModule{

}