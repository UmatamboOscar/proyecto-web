import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {LibroAutorEntity} from "./libro_autor.entity";
import {LibroEntity} from "../libro/libro.entity";

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

    buscarDetallePorIdLib(idLib: number){
        const consulta: FindManyOptions<LibroAutorEntity> = {
            where: [
                {
                    idLibro: idLib
                }
            ]
        }
        return this.repositorio.find(consulta)
    }

    eliminarDetalleLibroAutor(libroAutorEnt: LibroAutorEntity){
        // const consulta: FindManyOptions<LibroAutorEntity> = {
        //     where: [
        //         {
        //             idLibro: idLib
        //         }
        //     ]
        // }
        return this.repositorio.delete(libroAutorEnt)
    }

}