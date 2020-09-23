import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";
import {DetalleEntity} from "../detallePedido/detalle.entity";
import {UsuarioEntity} from "../Usuario/usuario.entity";


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
        type=>UsuarioEntity,
        usuario=> usuario.pedidos
    )
    usuario: UsuarioEntity;


    @OneToMany(
        type => LibroEntity,
        libro=> libro.autor
    )
    libros: LibroEntity;

    @OneToMany(
        type => DetalleEntity,
        detalle=>detalle.pedido
    )
    detalles:DetalleEntity[];
}