
import {Column, Entity, Index, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";
import {RolEntity} from "../rol/rol.entity";
import {PedidoEntity} from "../pedido/pedido.entity";

@Index([
    'nombre',
    'apellido',
    'telefono',
    'cedula',
    'domicilio',
    'correo',
    'password'//Nombres de las propiedades en las clases
])

@Entity('usuario') //nombre de la tabla usuario'
export class UsuarioEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment:'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        name: 'nombre',
        type: 'varchar',
        length: '60',
        nullable:false
    })
    nombre:string

    @Column({
        name: 'apellido',
        length: '60',
        type: 'varchar',
        nullable:false
    })
    apellido:string

    @Column({
        name:'telefono',
        nullable: true,
        type: 'varchar',
        length: '10'
    })
    telefono?:string;

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '10',
    })
    cedula:string

    @Column({
        name:'domicilio',
        nullable: true,
        type: 'varchar'
    })
    domicilio?:string;

    @Column({
        name:'correo',
        nullable: false,
        type: 'varchar'
    })
    correo:string;

    @Column({
        name:'password',
        nullable: false,
        type: 'varchar'
    })
    password:string;

    @OneToMany(
        type => PedidoEntity,//que entide nos relacionamos
        pedido => pedido.usuario
    )
    pedidos: PedidoEntity[];

    @ManyToMany(
        type => RolEntity,//que entide nos relacionamos
        rol => rol.usuarios
    )
    roles: RolEntity[];

}






















