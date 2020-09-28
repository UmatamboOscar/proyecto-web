import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroAutorEntity} from "../libro_autor/libro_autor.entity";


@Entity('autor')
export class AutorEntity{
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

    @Column({
        name: 'nacionalidad',
        type: 'varchar',
        nullable: false
    })
    nacionalidad: string;

    @Column({
        name: 'imagen',
        type: 'varchar',
        nullable: false
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
        autorLibro => autorLibro.autor
    )
    libros: LibroAutorEntity[];

}