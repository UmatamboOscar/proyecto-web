import {Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {VacunaEntity} from "../vacuna/vacuna.entity";
import {CategoriaEntity} from "../categoria/categoria.entity";
import {AutorEntity} from "../autor/autor.entity";
import {DetalleEntity} from "../detallePedido/detalle.entity";

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

    @ManyToMany(
        type => CategoriaEntity,
        categoria=> categoria.libros
    )
    categorias: CategoriaEntity;

    @ManyToMany(
        type => AutorEntity,
        autor=> autor.libros
    )
    autores: AutorEntity;

    @OneToOne(
        type => DetalleEntity,
        detalle=> detalle.libro
    )
    detalle: DetalleEntity;
}
