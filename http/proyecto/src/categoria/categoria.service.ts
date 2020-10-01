import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {CategoriaEntity} from "./categoria.entity";
import {LibroEntity} from "../libro/libro.entity";

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

    buscarTodos() {
        return this.repositorio.find() // promesa
    }

    categorias(textoDeConsulta:string){
        const consulta: FindManyOptions<CategoriaEntity> = {
            where: [
                {
                    categorias: textoDeConsulta
                }
            ]
        }
        return this.repositorio.find(consulta);
    }

}