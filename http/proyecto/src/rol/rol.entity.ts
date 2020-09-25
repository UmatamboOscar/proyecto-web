import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {RolUsuarioEntity} from "../rol_usuario/rol_usuario.entity";

@Entity('rol')
export class RolEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment:'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        name: 'rol',
        type: 'varchar',
        length: '20',
        nullable:false
    })
    rol:string


    @OneToMany(
        type => RolUsuarioEntity,//que entide nos relacionamos
        rolUsuario => rolUsuario.rol
    )
    usuarios: RolUsuarioEntity[];

}