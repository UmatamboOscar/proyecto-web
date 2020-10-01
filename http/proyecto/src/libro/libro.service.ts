import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LibroEntity} from "./libro.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

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
    buscarUno(id: number) {
        return this.repositorio.findOne(id) // promesa
    }
    buscarTodos() {
        return this.repositorio.find() // promesa
    }
    consultarLibros(textoDeConsulta?: string) {
            const consulta: FindManyOptions<LibroEntity> = {
                where: [
                    {
                        titulo: textoDeConsulta
                    },
                    {
                        ISBN: textoDeConsulta
                    }
                ]
            }
            return this.repositorio.find(consulta) // promesa
    }
}