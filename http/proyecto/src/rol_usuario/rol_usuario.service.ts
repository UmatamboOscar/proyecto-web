import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {RolUsuarioEntity} from "./rol_usuario.entity";

@Injectable()
export  class RolUsuarioService {
    constructor(
        @InjectRepository(RolUsuarioEntity)
        private repositorio: Repository<RolUsuarioEntity>
    ) {
    }

    crearNuevoRolUsuario(rolUsuario: RolUsuarioEntity){
        return this.repositorio.save(rolUsuario);
    }

    // buscarPorIdUsuario(id:number){
    //     const consulta: FindManyOptions<RolUsuarioEntity>= {
    //         where: [
    //             {
    //                 id: Like(`%${id}%`)
    //             }
    //
    //         ]
    //     }
    //     return this.repositorio.find(consulta)
    // }

    buscarPorIdUsuario(id:number){
        return this.repositorio.findOne(id)
    }

    getRepository(){
        return this.repositorio
    }


}