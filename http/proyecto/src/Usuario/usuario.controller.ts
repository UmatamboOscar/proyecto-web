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
        let usuarioCreado: UsuarioEntity
        try {
            const error: ValidationError[] = await validate(usuario)
            if(error.length == 0){
                try {
                    usuarioCreado = await this._usuarioService.crearUno(parametrosCuerpo);
                }catch (error) {
                    const mensajeError = 'Creando Usuario'
                    return res.redirect('/registro?error='+mensajeError)
                }
            }else{
                const mensajeError = 'Datos Inválidos'
                return res.redirect('/registro?error='+mensajeError)
            }
        } catch (error) {
            const mensajeError = 'En validación de datos'
            return res.redirect('/registro?error='+mensajeError)
        }
        let rolEncontrado: RolEntity
        if(usuarioCreado){
            try {
                rolEncontrado = await this._rolService.buscarUno(2)
            }catch (error) {
                const mensajeError = 'Buscando Rol'
                return res.redirect('/registro?error='+mensajeError)
            }
        }else{
            const mensajeError = 'Creando Usuario'
            return res.redirect('/registro?error='+mensajeError)
        }
        let rolUsuarioCreado
        let rolUsuario: RolUsuarioEntity;
        if(rolEncontrado){
            let rolUsuario1;
            rolUsuario1 = {
                rol: rolEncontrado,
                usuario: usuarioCreado
            }
            rolUsuario = rolUsuario1
            rolUsuarioCreado = await this._rolUsuarioService.crearNuevoRolUsuario(rolUsuario);
        }else{
            const mensajeError = 'Registrando Detalle Rol'
            return res.redirect('/registro?error='+mensajeError)
        }
        if(rolUsuarioCreado){
            const mensaje = 'Usuario registrado correctamente'
            session.usuario = usuarioCreado.nombre
            session.roles = [rolEncontrado.rol]
            return res.redirect('/inicio?mensaje='+mensaje)
        }else{
            const mensajeError = 'Registrando Rol'
            return res.redirect('/registro?error='+mensajeError)
        }
    }
}