import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {PedidoEntity} from "./pedido.entity";
import {PedidoService} from "./pedido.service";

@Module(
    {
        controllers:[],
        imports:[
            TypeOrmModule
                .forFeature([
                        PedidoEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers:[PedidoService],
        exports:[
            PedidoService
        ]
    }
)
export class PedidoModule{

}