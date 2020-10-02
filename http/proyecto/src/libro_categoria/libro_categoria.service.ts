import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Repository} from "typeorm";
import {LibroCategoriaEntity} from "./libro_categoria.entity";
import {LibroAutorEntity} from "../libro_autor/libro_autor.entity";

@Injectable()
export  class LibroCategoriaService {
    constructor(
        @InjectRepository(LibroCategoriaEntity)
        private repositorio: Repository<LibroCategoriaEntity>
    ) {
    }
    crearNuevoLibroCategoria(categoria:LibroCategoriaEntity){
        return this.repositorio.save(categoria);
    }

    buscarDetallePorIdLib(idLib: number){
        const consulta: FindManyOptions<LibroCategoriaEntity> = {
            where: [
                {
                    idLibro: idLib
                }
            ]
        }
        return this.repositorio.find(consulta)
    }

    eliminarDetalleLibroCategoria(libroCatEnt: LibroCategoriaEntity){
        // const consulta: FindManyOptions<LibroAutorEntity> = {
        //     where: [
        //         {
        //             idLibro: idLib
        //         }
        //     ]
        // }
        return this.repositorio.delete(libroCatEnt)
    }
}