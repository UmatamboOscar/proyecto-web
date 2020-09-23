import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CategoriaEntity} from "./categoria.entity";

@Injectable()
export  class CategoriaService {
    constructor(
        @InjectRepository(CategoriaEntity)
        private repositorio: Repository<CategoriaEntity>
    ) {
    }
    crearNuevaCategoria(categoria:CategoriaEntity){
        return this.repositorio.save(categoria);
    }
}