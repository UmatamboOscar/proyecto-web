import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";
import {UsuarioEntity} from "../Usuario/usuario.entity";

@Entity()
export class RolEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    tipo: string;
    @Column()

    @ManyToOne(
        type=>UsuarioEntity,
        usuario=> usuario.rol
    )
    usuario: UsuarioEntity;


}