import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {VacunaEntity} from "../vacuna/vacuna.entity";
import {CategoriaEntity} from "../categoria/categoria.entity";
import {AutorEntity} from "../autor/autor.entity";
import {DetalleEntity} from "../detallePedido/detalle.entity";

@Entity()
export class LibroEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    titulo: string;
    @Column()
    autor: string;
    @Column()
    stock: number;


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

    @ManyToOne(
        type => DetalleEntity,
        detalle=> detalle.libros
    )
    detalle: DetalleEntity;
}
