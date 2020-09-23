
import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";
import {RolEntity} from "../rol/rol.entity";

@Index([
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento'
])

@Index([
    'nombre',
    'apellido',
    'cedula'
],{unique:true})

@Entity('epn_usuario') //nombre de la tabla usuario'
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
    nombre?:string

    @Column({
        name: 'apellido',
        length: '60',
        type: 'varchar',
        nullable:true
    })
    apellido?:string

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '18',
    })
    cedula:string

    @Column({
        name:'sueldo',
        nullable: true,
        type: 'decimal',
        precision: 10, // 100000000000
        scale: 2 //.0001
    })
    sueldo?:number;

    @Column({
        name:'fechaNacimiento',
        nullable:true,
        type:'datetime'
    })
    fechaNacimiento:string

    @OneToMany(
        type => LibroEntity,//que entide nos relacionamos
        libro => libro.usuario
    )
    libros: LibroEntity[];

    @OneToMany(
        type => RolEntity,//que entide nos relacionamos
        rol => rol.usuario
    )
    rol: RolEntity[];

}






















