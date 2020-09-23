import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";

@Entity()
export class CategoriaEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()

    @ManyToOne(
        type=>LibroEntity,
        libro=> libro.categorias
    )
    libro: LibroEntity;


}
