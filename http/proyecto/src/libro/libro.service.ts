import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LibroEntity} from "./libro.entity";
import {Repository} from "typeorm";

@Injectable()
export  class LibroService {
constructor(
    @InjectRepository(LibroEntity)
    private repositorio: Repository<LibroEntity>
) {
}
crearNuevoLibro(libro:LibroEntity){
    return this.repositorio.save(libro);
}
}