import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";
import {LibroAutorEntity} from "../libro_autor/libro_autor.entity";
import {LibroCategoriaEntity} from "../libro_categoria/libro_categoria.entity";

@Entity('categoria')
export class CategoriaEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment:'Identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: false
    })
    nombre: string;

    @OneToMany(
        type => LibroCategoriaEntity,//que entide nos relacionamos
        categoriaLibro => categoriaLibro.categoria
    )
    libros: LibroCategoriaEntity[];

}
