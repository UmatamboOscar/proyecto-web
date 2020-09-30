import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {RolEntity} from "../rol/rol.entity";


@Entity('rol_usuario')
export class RolUsuarioEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number;

    @ManyToOne(
        type=>RolEntity,
        rol=> rol.usuarios
    )
    @JoinColumn({name: 'rolId'})
    rol: RolEntity;

    @ManyToOne(
        type=>UsuarioEntity,
        usuario=> usuario.roles
    )
    @JoinColumn({name: 'usuarioId'})
    usuario: UsuarioEntity;

}