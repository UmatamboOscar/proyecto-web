import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RolUsuarioEntity} from "./rol_usuario.entity";

@Injectable()
export  class RolUsuarioService {
    constructor(
        @InjectRepository(RolUsuarioEntity)
        private repositorio: Repository<RolUsuarioEntity>
    ) {
    }
    crearNuevoRolUsuario(autor:RolUsuarioEntity){
        return this.repositorio.save(autor);
    }
}