import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";
import {PedidoEntity} from "../pedido/pedido.entity";


@Entity()
export class DetalleEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment:'Identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'cantidad',
        type: 'int',
        nullable: false,
    })
    cantidad: number;

    @Column({
        name: 'precioUnitario',
        nullable: false,
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    precioUnitario: number;

    @Column({
        name: 'precioTotal',
        nullable: false,
        type: 'decimal',
        precision: 10,
        scale: 2
    })
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