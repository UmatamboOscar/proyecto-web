import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";
import {CategoriaEntity} from "../categoria/categoria.entity";

@Entity('libro_categoria')
export class LibroCategoriaEntity{
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
        libro=> libro.categorias
    )
    libro: LibroEntity;

    @ManyToOne(
        type=>CategoriaEntity,
        autor=> autor.libros
    )
    categoria: CategoriaEntity;
}