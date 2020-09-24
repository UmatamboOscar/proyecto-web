import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../Usuario/usuario.entity";

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


    @ManyToMany(
        type=>UsuarioEntity,
        usuario=> usuario.roles
    )
    usuarios: UsuarioEntity;


}