import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";


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

    @ManyToMany(
        type => LibroEntity,
        libro=> libro.autores
    )
    libros: LibroEntity;

}