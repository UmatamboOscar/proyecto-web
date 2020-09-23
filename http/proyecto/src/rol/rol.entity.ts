import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../Usuario/usuario.entity";

@Entity()
export class RolEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    tipo: string;
    @Column()

    @ManyToMany(
        type=>UsuarioEntity,
        usuario=> usuario.roles
    )
    usuarios: UsuarioEntity;


}