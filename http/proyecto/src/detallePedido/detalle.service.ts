import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DetalleEntity} from "./detalle.entity";

@Injectable()
export  class DetalleService {
    constructor(
        @InjectRepository(DetalleEntity)
        private repositorio: Repository<DetalleEntity>
    ) {
    }
    crearNuevoDetalle(detalle:DetalleEntity){
        return this.repositorio.save(detalle);
    }
}