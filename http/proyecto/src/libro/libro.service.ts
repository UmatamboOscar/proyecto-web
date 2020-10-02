import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LibroEntity} from "./libro.entity";
import {FindManyOptions, Like, Repository} from "typeorm";
import {CategoriaEntity} from "../categoria/categoria.entity";

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

    editarUno(libroEditado: LibroEntity){
        return this.repositorio.save(libroEditado);
    }
    eliminarUno(id:number){
    return this.repositorio.delete(id)
    }


    consultarLibros(textoDeConsulta?: string) {
        if(textoDeConsulta !== undefined) {
            const consulta: FindManyOptions<LibroEntity> = {
                where: [
                    {
                        titulo: Like(`%${textoDeConsulta}%`)
                    },
                    {
                        ISBN: Like(`%${textoDeConsulta}%`)
                    }
                ]
            }
                return this.repositorio.find(consulta) // promesa
            }else{
                return this.repositorio.find()
            }
    }
}