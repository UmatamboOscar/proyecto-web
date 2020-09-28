import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {LibroCategoriaEntity} from "./libro_categoria.entity";

@Injectable()
export  class LibroCategoriaService {
    constructor(
        @InjectRepository(LibroCategoriaEntity)
        private repositorio: Repository<LibroCategoriaEntity>
    ) {
    }
    crearNuevoLibroAutor(autor:LibroCategoriaEntity){
        return this.repositorio.save(autor);
    }
}