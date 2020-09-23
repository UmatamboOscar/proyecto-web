import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";


@Entity()
export class AutorEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    nacionalidad: string;

    @ManyToMany(
        type => LibroEntity,
        libro=> libro.autores
    )
    libros: LibroEntity;

}