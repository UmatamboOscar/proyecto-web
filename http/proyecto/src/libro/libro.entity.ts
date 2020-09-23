import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {VacunaEntity} from "../vacuna/vacuna.entity";
import {CategoriaEntity} from "../categoria/categoria.entity";
import {AutorEntity} from "../autor/autor.entity";

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

@ManyToOne(
    type=>UsuarioEntity,
    usuario=> usuario.libros
)
    usuario: UsuarioEntity;



@OneToMany(
    type => CategoriaEntity,
    categoria=> categoria.libro
)
    categorias: CategoriaEntity;

    @OneToMany(
        type => CategoriaEntity,
        autor=> autor.libro
    )
    autores: AutorEntity;

}






















