import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RolEntity} from "./rol.entity";
import {RolUsuarioEntity} from "../rol_usuario/rol_usuario.entity";

@Injectable()
export  class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private repositorio: Repository<RolEntity>
    ) {
    }
    crearNuevoRol(rol:RolEntity){
        return this.repositorio.save(rol);
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id)
    }


}