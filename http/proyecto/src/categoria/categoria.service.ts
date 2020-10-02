import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {CategoriaEntity} from "./categoria.entity";

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
    buscarUno(id: number){
        return this.repositorio.findOne(id) //Promesa
    }

    editarUno(categoriaEditada: CategoriaEntity){
        return this.repositorio.save(categoriaEditada);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id)
    }


    buscarCategoriaPorNombre(nombre: string){
        const consulta: FindManyOptions<CategoriaEntity> = {
            relations: ['libros'],
            where: [
                {
                    nombre: nombre
                }
            ]
        }
        return this.repositorio.find(consulta)
    }



}