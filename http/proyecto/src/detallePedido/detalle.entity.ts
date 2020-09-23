import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";
import {PedidoEntity} from "../pedido/pedido.entity";


@Entity()
export class DetalleEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    cantidad: number;
    @Column()
    precioUnitario: number;
    @Column()
    precioTotal: number;

    @OneToMany(
        type => LibroEntity,
        libro=> libro.detalle
    )
    libros: LibroEntity[];

    @ManyToOne(
        type => PedidoEntity,
        pedido=>pedido.detalles
    )
    pedido:PedidoEntity;

}