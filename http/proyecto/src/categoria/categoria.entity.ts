import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";

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

    @ManyToMany(
        type=>LibroEntity,
        libro=> libro.categorias
    )
    libros: LibroEntity;

}
