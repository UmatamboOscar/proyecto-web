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

    buscarTodos(){
        return this.repositorio.find();
    }

    buscarUno(id:number){
        return this.repositorio.findOne(id);
    }

    crearNuevoAutor(autor:AutorEntity){
        return this.repositorio.save(autor);
    }
    eliminarUno(id: number){
        return this.repositorio.delete(id)
    }
    editarUno(autorEditado:AutorEntity){
        return this.repositorio.save(autorEditado);
    }

}