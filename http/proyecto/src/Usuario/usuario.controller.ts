import {
    Body,
    Controller, Post, Res, Session,
} from "@nestjs/common";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {validate, ValidationError} from "class-validator";
import {UsuarioService} from "./usuario.service";
import {RolUsuarioService} from "../rol_usuario/rol_usuario.service";
import {RolUsuarioEntity} from "../rol_usuario/rol_usuario.entity";
import {RolService} from "../rol/rol.service";
import {RolEntity} from "../rol/rol.entity";
import {UsuarioEntity} from "./usuario.entity";

@Controller('usuario')

export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _rolUsuarioService: RolUsuarioService,
        private readonly _rolService: RolService
    ){
    }

    @Post('crearUsuario')
    async crearUsuario(
        @Body() parametrosCuerpo,
        @Res() res,
        @Session() session
    ) {
        const usuario = new UsuarioCreateDto()
        usuario.nombre = parametrosCuerpo.nombre
        usuario.apellido = parametrosCuerpo.apellido
        usuario.cedula = parametrosCuerpo.cedula
        usuario.correo = parametrosCuerpo.correo
        usuario.telefono = parametrosCuerpo.telefono
        usuario.domicilio = parametrosCuerpo.domicilio
        usuario.password = parametrosCuerpo.password
        if(parametrosCuerpo.password == parametrosCuerpo.confPassword) {
            let usuarioCreado: UsuarioEntity
            try {
                const error: ValidationError[] = await validate(usuario)
                if (error.length == 0) {
                    try {
                        usuarioCreado = await this._usuarioService.crearUno(parametrosCuerpo);
                    } catch (error) {
                        const mensajeError = 'Datos Inválidos'
                        return res.redirect('/registro?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}&cedula=${parametrosCuerpo.cedula}&correo=${parametrosCuerpo.correo}&telefono=${parametrosCuerpo.telefono}&domilicio=${parametrosCuerpo.domicilio}`)
                    }
                } else {
                    const mensajeError = 'Datos Inválidos'
                    return res.redirect('/registro?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}&cedula=${parametrosCuerpo.cedula}&correo=${parametrosCuerpo.correo}&telefono=${parametrosCuerpo.telefono}&domilicio=${parametrosCuerpo.domicilio}`)
                }
            } catch (error) {
                const mensajeError = 'Datos Inválidos'
                return res.redirect('/registro?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}&cedula=${parametrosCuerpo.cedula}&correo=${parametrosCuerpo.correo}&telefono=${parametrosCuerpo.telefono}&domilicio=${parametrosCuerpo.domicilio}`)
            }
            let rolEncontrado: RolEntity
            if (usuarioCreado) {
                try {
                    rolEncontrado = await this._rolService.buscarUno(2)
                } catch (error) {
                    const mensajeError = 'Datos Inválidos'
                    return res.redirect('/registro?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}&cedula=${parametrosCuerpo.cedula}&correo=${parametrosCuerpo.correo}&telefono=${parametrosCuerpo.telefono}&domilicio=${parametrosCuerpo.domicilio}`)
                }
            } else {
                const mensajeError = 'Datos Inválidos'
                return res.redirect('/registro?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}&cedula=${parametrosCuerpo.cedula}&correo=${parametrosCuerpo.correo}&telefono=${parametrosCuerpo.telefono}&domilicio=${parametrosCuerpo.domicilio}`)
            }
            let rolUsuarioCreado
            let rolUsuario: RolUsuarioEntity;
            if (rolEncontrado) {
                let rolUsuario1;
                rolUsuario1 = {
                    rol: rolEncontrado,
                    usuario: usuarioCreado
                }
                rolUsuario = rolUsuario1
                rolUsuarioCreado = await this._rolUsuarioService.crearNuevoRolUsuario(rolUsuario);
            } else {
                const mensajeError = 'Datos Inválidos'
                return res.redirect('/registro?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}&cedula=${parametrosCuerpo.cedula}&correo=${parametrosCuerpo.correo}&telefono=${parametrosCuerpo.telefono}&domilicio=${parametrosCuerpo.domicilio}`)
            }
            if (rolUsuarioCreado) {
                session.usuario = usuarioCreado.nombre
                session.roles = [rolEncontrado.rol]
                res.redirect('/inicio')
                /*res.render(
                    'inicio/inicio',
                    {
                        mensaje: 'Usuario registrado correctamente',
                        usuario: session.usuario,
                        roles: session.roles
                    }
                )*/
            } else {
                const mensajeError = 'Datos Inválidos'
                return res.redirect('/registro?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}&cedula=${parametrosCuerpo.cedula}&correo=${parametrosCuerpo.correo}&telefono=${parametrosCuerpo.telefono}&domilicio=${parametrosCuerpo.domicilio}`)
            }
        }else{
            const mensajeError = 'Las Contraseñas no coinciden'
            return res.redirect('/registro?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}&cedula=${parametrosCuerpo.cedula}&correo=${parametrosCuerpo.correo}&telefono=${parametrosCuerpo.telefono}&domilicio=${parametrosCuerpo.domicilio}`)
        }
    }

    @Post('login')
    async login(
        @Body() parametrosConsulta,
        @Res() res,
        @Session() session
    ) {
        const password = parametrosConsulta.password;
        let busquedaUsuario
        try {
            busquedaUsuario = await this._usuarioService.buscarPorCorreo(parametrosConsulta.correo)
        }catch (error) {
            const mensajeError = 'Correo no registrado'
            res.redirect('/login?error=' + mensajeError)
        }
        if(busquedaUsuario){
            console.log( busquedaUsuario[0] )
            if(  busquedaUsuario[0].password == password){
                // let buscarRol
                // let respuestaRol
                // try {
                //     buscarRol = await this._rolUsuarioService.buscarPorIdUsuario(busquedaUsuario[0].roles.id)
                //     console.log(buscarRol.usuarioId)
                //     console.log(respuestaRol)
                // }catch (error) {
                //     const mensajeError = 'no se encontro rol'
                //     res.redirect('/login?error=' + mensajeError)
                // }
                // if(buscarRol){
                //     const mensajeError = 'jeje si encontro'
                //     res.redirect('/login?error=' + mensajeError)
                // }
                session.usuario = busquedaUsuario[0].nombre+' '+busquedaUsuario[0].apellido
                session.roles = [busquedaUsuario[0].rol]
                res.redirect('/inicio?usuario='+busquedaUsuario[0].nombre+' '+busquedaUsuario[0].apellido+'&rol='+busquedaUsuario[0].rol)
 /*               res.render(
                    'inicio/inicio',
                    {
                        usuario: session.usuario,
                        roles: session.roles
                    }
                )*/
            }else{
                const mensajeError = 'Usuario o contraseña incorrecta'
                res.redirect('/login?error=' + mensajeError)
            }
        }else{
            const mensajeError = 'Correo no registrado'
            res.redirect('/login?error=' + mensajeError)
        }
    }



}