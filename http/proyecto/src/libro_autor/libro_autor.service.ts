import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {LibroAutorEntity} from "./libro_autor.entity";

@Injectable()
export  class LibroAutorService {
    constructor(
        @InjectRepository(LibroAutorEntity)
        private repositorio: Repository<LibroAutorEntity>
    ) {
    }
    crearNuevoLibroAutor(autor:LibroAutorEntity){
        return this.repositorio.save(autor);
    }
}