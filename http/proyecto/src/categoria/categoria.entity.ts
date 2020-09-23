import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";

@Entity()
export class CategoriaEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()

    @ManyToMany(
        type=>LibroEntity,
        libro=> libro.categorias
    )
    libros: LibroEntity;


}
