import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {UsuarioUpdateDto} from "./dto/usuario.update-dto";
import {LibroService} from "../libro/libro.service";
import {catchError} from "rxjs/operators";
import {UsuarioEntity} from "./usuario.entity";


@Controller('usuario')

export class UsuarioController {
    public arregloUsuarios = [{
        id: 1,
        nombre: 'Gab'
    }, {
        id: 2,
        nombre: 'Maty'
    }, {
        id: 3,
        nombre: 'San',
    }
    ]
    public idActual = 3;


    constructor(//inyeccion de dependencias)
     private readonly _usuarioService: UsuarioService,
    private readonly _libroService: LibroService
    ){

    }


    @Get()
    async mostrarTodos() {
        try{
            const respuesta = await this._usuarioService.buscarTodos();
            return respuesta;
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:'Error de servidor',
            })
        }
        //return this.arregloUsuarios;
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ) {
        const user = new UsuarioCreateDto()
        user.nombre= parametrosCuerpo.nombre
        user.apellido=parametrosCuerpo.apellido
        user.cedula=parametrosCuerpo.cedula
        user.sueldo=parametrosCuerpo.sueldo
        user.fechaNacimiento=parametrosCuerpo.fechaNacimiento

        try{
            // validaciones
            const respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
            const msg= 'Su usuario se ha creado correctamente';
            return msg
        }catch (e) {
            console.error(e);
            throw new BadRequestException( {
                mensaje: 'Error validando datos'
            });
        }


/*
        const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.idActual + 1
        };
        //return 'ok'
        this.arregloUsuarios.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario;
*/
    }

    @Get('vista/editar/:id') // Controlador
    async editarUsuarioVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ) {
        const id = Number(parametrosRuta.id)
        let usuarioEncontrado;
        try {
            usuarioEncontrado = await this._usuarioService.buscarUno(id);
        } catch (error) {
            console.error('Error del servidor');
            return res.redirect('/usuario/vista/inicio?mensaje=Error buscando usuario');
        }
        if (usuarioEncontrado) {
            return res.render(
                'usuario/crear',
                {
                    error: parametrosConsulta.error,
                    usuario: usuarioEncontrado
                }
            )
        } else {
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario no encontrado');
        }

    }


    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ) {
        let respuesta;
        try {
            respuesta = await this._usuarioService.buscarUno(
                parametrosRuta.id);

        } catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error del servidor'
            });

            /*        const indice = this.arregloUsuarios.findIndex(
                        (usuario) => usuario.id === Number
                        (parametrosRuta.id)
                    )
                    return this.arregloUsuarios[indice];*/
        }if(respuesta) {
            return respuesta
        }else{
            throw new BadRequestException(
                {mensaje: 'No existen registros',}
            )
        }
    }


    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo

    ){
        const user= new UsuarioUpdateDto()
        user.nombre= parametrosCuerpo.nombre
        user.apellido=parametrosCuerpo.apellido
        user.cedula=parametrosCuerpo.cedula
        user.sueldo=parametrosCuerpo.sueldo
        user.fechaNacimiento=parametrosCuerpo.fechaNacimiento

        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosCuerpo;
        usuarioEditado.id = id;
        try{
            const respuesta = await this._usuarioService
                .editarUno(usuarioEditado);
            return respuesta;
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }


        /*const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number
            (parametrosRuta.id)
        )
        this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloUsuarios[indice];*/
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id= Number(parametrosRuta.id);
        try {
            const respuesta= await this._usuarioService
                .eliminarUno(id);
            return {
                mensaje: 'Registro con id ' + id + ' eliminado'
            }
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            });

        }
 /*       const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number
            (parametrosRuta.id)
        )
        this.arregloUsuarios.splice(indice, 1);
        return this.arregloUsuarios[indice];
 */
    }
    @Post ('crearUsuarioYCrearMascota')
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
    ){
        const usuario= parametrosCuerpo.usuario;
        const libro = parametrosCuerpo.libro;
        //validar libro
        //validar usuario
        //creamos los dos
        let usuarioCreado;
        try {
            usuarioCreado = await this._usuarioService.crearUno(usuario);
        }catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error creando usuario',
            })
        }
        if(usuarioCreado){
            libro.usuario = usuarioCreado.id;
            let mascotaCreada;
            try {
                mascotaCreada = await this._libroService.crearNuevoLibro(libro);
            }catch (e){
                console.error(e);
                throw new BadRequestException({
                    mensaje:'Error al crear Mascota',
                })
            }
        if(mascotaCreada) {
            return {
                mascota: mascotaCreada,
                usuario: usuarioCreado
            }
        }else{
                throw new InternalServerErrorException({
                    mensaje:'Error al crear Mascota',
                })
            }
        }else{
            throw new InternalServerErrorException({
                mensaje:'Error al crear Mascota',
            })
        }

    }

    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ){
        const nombreControlador ='Gaby';
        res.render(
            'usuario/ejemplo',//nombre de la vista
        {//Parametros de la vista
            nombre: nombreControlador,
        })
    }



    @Get('vista/faq')
    faq(
    @Res() res
    ){
        res.render('usuario/faq')
    }



    @Get('vista/inicio')
    async inicio(
        @Res() res,
        @Query() parametrosConsulta,
    ){
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos(parametrosConsulta.busqueda);
        }catch (error) {
         throw new  InternalServerErrorException('Error encontrando usuarios')
                    }
        if(resultadoEncontrado) {
            res.render('usuario/inicio',{
                arregloUsuarios: resultadoEncontrado,
                parametrosConsulta: parametrosConsulta
            });
        }else{
        throw new NotFoundException('No se encontraron usuarios ')
    }
    }



    @Get('vista/crear')
    crearUsuarioVista(
        @Res() res,
        @Query() parametrosConsulta,
    ){
            return res.render(
                'usuario/crear',
                {
                    error: parametrosConsulta.error,
                    nombre: parametrosConsulta.nombre,
                    apellido: parametrosConsulta.apellido,
                    cedula: parametrosConsulta.cedula
                }
            )
        }



    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        // Validar los datos con un rico DTO
        let nombreApellidoConsulta;
        let cedulaConsulta;
        if (parametrosCuerpo.cedula && parametrosCuerpo.nombre && parametrosCuerpo.apellido) {
            nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`
            if (parametrosCuerpo.cedula.length === 10) {
                cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
            } else {
                const mensajeError = 'Cedula incorrecta'
                return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta)
            }
        } else {
            const mensajeError = 'Enviar cedula(10) nombre y apellido'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError)
        }
        let respuestaCreacionUsuario;
        try {
            respuestaCreacionUsuario = await this._usuarioService.crearUno(parametrosCuerpo);
        } catch (error) {
            console.error(error);
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta)
        }
        if (respuestaCreacionUsuario) {
            return res.redirect('/usuario/vista/inicio');
        } else {
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta);
        }
    }




    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._usuarioService.eliminarUno(id)
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario eliminado')
        } catch (error) {
            console.log(error);
            return res.redirect('/usuario/vista/inicio?error=Error eliminando usuario')
        }
    }



    @Get('vista/login')
    login(
        @Res() res
    ){
        return res.render('usuario/login')
    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ){
        const usuarioEditado={
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido,
            cedula: parametrosCuerpo.cedula,
        } as UsuarioEntity;
        try {
            await this._usuarioService.editarUno(usuarioEditado);
            return  res.redirect('/usuario/vista/inicio?mensaje=Usuario editado');
        }catch (error) {
            console.error(error);
            return res.redirect('/usuario/vista/inicio?mensaje=Error al editar usuario')
        }
    }


}

//XML <usuario>GABY</nombre></usuario>
//JSON {"nombre": "GABY"}
//RESTful -JSON
//Ver todos
//http://localhost:3001/
//Get
//RESTful MASCOTA
//http://localhost:3001/mascota se recibe a todas las mascotas

//Ver uno
//http://localhost:3001/mascota/1 se ve a las mascotas con id=1

//Crear Uno
// POST http://localhost:3001/mascota/

//Editar Uno
//PUT http://localhost:3001/mascota/1

//Eliminar uno
//Delete http://localhost:3001/mascota/1
