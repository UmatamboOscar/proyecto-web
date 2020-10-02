import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DetalleEntity} from "../detallePedido/detalle.entity";
import {LibroAutorEntity} from "../libro_autor/libro_autor.entity";
import {LibroCategoriaEntity} from "../libro_categoria/libro_categoria.entity";

@Entity('libro')
export class LibroEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment:'Identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'ISBN',
        type: 'varchar',
        nullable: false
    })
    ISBN: string;

    @Column({
        name: 'titulo',
        type: 'varchar',
        nullable: false
    })
    titulo: string;

    @Column({
        name: 'stock',
        type: 'int',
        nullable: false,
    })
    stock: number;

    @Column({
        name: 'precio',
        nullable: false,
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    precio: number;

    @Column({
        name: 'imagen',
        type: 'varchar',
        nullable: false,
    })
    imagen: string;

    @Column({
        name: 'descripcion',
        type: 'varchar',
        nullable: false
    })
    descripcion: string;

    @OneToMany(
        type => LibroAutorEntity,//que entide nos relacionamos
        libroAutor => libroAutor.libro
    )
    autores: LibroAutorEntity[];

    @OneToMany(
        type => LibroCategoriaEntity,//que entide nos relacionamos
        libroCategoria => libroCategoria.libro
    )
    categorias: LibroCategoriaEntity[];

    @OneToMany(
        type => DetalleEntity,
        detalle=> detalle.libro
    )
    detalles: DetalleEntity[];
}
