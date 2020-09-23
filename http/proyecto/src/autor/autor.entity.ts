import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {LibroEntity} from "../libro/libro.entity";


@Entity()
export class AutorEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    nacionalidad: string;

    @ManyToOne(
        type=>LibroEntity,
        libro=> libro.autores
    )
    libro: LibroEntity;


    @OneToMany(
        type => LibroEntity,
        libro=> libro.autor
    )
    libros: LibroEntity;

}