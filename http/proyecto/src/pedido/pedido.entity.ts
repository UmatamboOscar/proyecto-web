import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";
import {DetalleEntity} from "../detallePedido/detalle.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";


@Entity('pedido')
export class PedidoEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment:'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        nullable: false,
        type: 'date',
        name: 'fechaPedido'
    })
    fechaPedido: string;

    @Column({
        name: 'precioTotal',
        nullable: false,
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    precioTotal: number;

    @Column({
        name: 'estadoCarrito',
        type: 'varchar',
        nullable: false
    })
    estado: string;

    @ManyToOne(
        type=>UsuarioEntity,
        usuario=> usuario.pedidos
    )
    usuario: UsuarioEntity;

    @OneToMany(
        type => DetalleEntity,
        detalle=>detalle.pedido
    )
    detalles:DetalleEntity[];
}