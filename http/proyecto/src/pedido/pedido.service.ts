import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PedidoEntity} from "./pedido.entity";

@Injectable()
export  class PedidoService {
    constructor(
        @InjectRepository(PedidoEntity)
        private repositorio: Repository<PedidoEntity>
    ) {
    }
    crearNuevoPedido(pedido:PedidoEntity){
        return this.repositorio.save(pedido);
    }
}