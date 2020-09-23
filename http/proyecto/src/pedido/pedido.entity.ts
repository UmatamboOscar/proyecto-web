import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";


@Entity()
export class PedidoEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    fecha: string;
    @Column()
    precio: number;
    @Column()
    estado: boolean;

    @ManyToOne(
        type=>LibroEntity,
        libro=> libro.autores
    )
    libro: LibroEntity;


    @OneToMany(
        type => LibroEntity,
        libro=> libro.autor
    )
    libros: LibroEntity;

}