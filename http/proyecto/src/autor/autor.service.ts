import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AutorEntity} from "./autor.entity";

@Injectable()
export  class AutorService {
    constructor(
        @InjectRepository(AutorEntity)
        private repositorio: Repository<AutorEntity>
    ) {
    }
    crearNuevoAutor(autor:AutorEntity){
        return this.repositorio.save(autor);
    }
}