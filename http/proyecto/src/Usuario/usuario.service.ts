import {Injectable} from "@nestjs/common";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Not, Repository} from "typeorm";
import {Between, FindManyOptions, In, IsNull, LessThanOrEqual, Like, MoreThanOrEqual} from "typeorm";


@Injectable()
export class UsuarioService{
    constructor( //Inyeccion de dependencias
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>

    ) {
    }
    crearUno(nuevoUsuario:UsuarioEntity ) {
        return this.repositorio.save(nuevoUsuario) //promesas
    }

    buscarTodos(textoConsulta?:string){
        /*let busquedaEjemplo : FindManyOptions<UsuarioEntity>
        busquedaEjemplo={
        relations: ['mascotas','mascotas.vacunas']
        }
        busquedaEjemplo={
            where:{
                nombre:'gabs', apellido:'bayola' //Busqueda exacta
            }
        }
        busquedaEjemplo={
            order:{
                nombre:'ASC',
                id:'DESC'
            }
        }
        busquedaEjemplo={
            skip:0,
            take:10
        }
        busquedaEjemplo= {
            where: [
                {
                    nombre: 'Gaby',
                    apellido: 'Bayola'
                }, {
                    nombre: 'Bayola',
                    apellido: 'Gaby'
                }
            ]
        }

        busquedaEjemplo={
            where:{
                fechaNacimiento: Not('Gab'),
            }
        }
        busquedaEjemplo={
            where:{
                fechaNacimiento: LessThanOrEqual('1990-01-08'),
            }
        }
        busquedaEjemplo={
            where:{
                fechaNacimiento: MoreThanOrEqual('1990-01-08'),
            }
        }
        busquedaEjemplo={
            where:{
                fechaNacimiento: Like('%ab%'),
            }
        }
        busquedaEjemplo={
            where:{
                fechaNacimiento: Between('1990-01-08', '2019-01-08'),
            }
        }
        busquedaEjemplo={
            where:{
                pokemon: In([1,2,3,4,5,6]),
            }
        }
        busquedaEjemplo={
            where:{
                casado: IsNull(),
            }
        }*/
        const consulta: FindManyOptions<UsuarioEntity>= {
            where: [
                {
                    nombre: Like(`%${textoConsulta}`)
                },
                {
                    apellido:Like(`%${textoConsulta}`)
                },
                {
                    cedula:Like(`%${textoConsulta}`)
                }

            ]
        }

        return this.repositorio.find() //promesa
    }

    buscarUno(id:number){
        return this.repositorio.findOne(id) //promesa
    }

    editarUno(usuarioEditado: UsuarioEntity){
        return this.repositorio.save(usuarioEditado);
    }
    eliminarUno(id:number){
        return this.repositorio.delete(id);
    }
//usuario -> mascotas
    //libro -> vacunas


}