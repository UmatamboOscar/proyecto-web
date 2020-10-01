import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";
import {AutorEntity} from "../autor/autor.entity";


@Entity('libro_autor')
export class LibroAutorEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment:'Identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'idLibro',
        type: 'int',
        nullable: false
    })
    idLibro: number;

    @ManyToOne(
        type=>LibroEntity,
        libro=> libro.autores
    )
    libro: LibroEntity;

    @ManyToOne(
        type=>AutorEntity,
        autor=> autor.libros
    )
    autor: AutorEntity;

}