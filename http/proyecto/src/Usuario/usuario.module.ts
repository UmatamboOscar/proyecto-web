import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {LibroModule} from "../libro/libro.module";

@Module(
    {
        controllers:[
            UsuarioController
        ],
        imports:[
            LibroModule,
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