import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException, Param, Post,
    Query,
    Res, Session
} from "@nestjs/common";
import {AutorService} from "./autor.service";
import {CategoriaService} from "../categoria/categoria.service";
import {AutorCreateDto} from "./dto/autor.create-dto";
import {validate,ValidationError} from "class-validator";
import {AutorEntity} from "./autor.entity";
import {AutorUpdateDto} from "./dto/autor.update-dto";


@Controller('autor')
export class AutorController{
    constructor(
        private readonly _autorService: AutorService,
        private readonly _categoriaService: CategoriaService
    ) {
    }

    @Get('menu')
    async menu(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ) {
        session.usuario = parametrosConsulta.usuario
        session.roles = [parametrosConsulta.rol]
        let busqueda 
        const consultaCategoria = await this._categoriaService.buscarTodos()
        try{
            busqueda= await this._autorService.buscarTodos()
        }catch (e) {
            throw  new InternalServerErrorException('Error encontrando autores')
        }
        if (busqueda) {
            res.render(
                'administracion/autores',
                {
                    autores: busqueda,
                    parametrosConsulta: parametrosConsulta,
                    usuario: session.usuario,
                    roles: session.roles,
                    categorias: consultaCategoria
                }
            )
        } else {
            throw new NotFoundException('No se encontraron autores')
        }
    }

    @Get('crear') // Controlador
    vistaCrearAutor(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session
    ) {
        session.usuario = parametrosConsulta.usuario
        session.roles = [parametrosConsulta.rol]
            return res.render(
                'administracion/crearautor',
                {
                    error: parametrosConsulta.error,
                    nombre: parametrosConsulta.nombre,
                    nacionalidad: parametrosConsulta.nacionalidad,
                    descripcion: parametrosConsulta.descripcion,
                    imagen: parametrosConsulta.imagen,
                    usuario: session.usuario,
                    roles: session.roles
                }
            )
    }

    @Post('crear')
    async crearAutor(
        @Query() parametrosConsulta,
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        const autor = new AutorCreateDto()
        autor.nombre = parametrosCuerpo.nombre
        autor.nacionalidad = parametrosCuerpo.nacionalidad
        autor.descripcion = parametrosCuerpo.descripcion
        autor.imagen = parametrosCuerpo.imagen
        try {
            const error: ValidationError[] = await validate(autor)
            if (error.length !== 0) {
                let respuesta;
                try {
                    respuesta = await this._autorService.crearNuevoAutor(parametrosCuerpo);
                } catch (error) {
                    console.error(error);
                    const mensajeError = 'Creando nuevo Autor'
                    return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&nacionalidad=${parametrosCuerpo.nacionalidad}&descripcion=${parametrosCuerpo.descripcion}&imagen=${parametrosCuerpo.imagen}`);
                }
                if (respuesta) {
                    return res.redirect('/autor/menu?usuario='+parametrosConsulta.usuario+'&rol='+parametrosConsulta.rol)
                } else {
                    const mensajeError = 'Creando nuevo autor'
                    return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&nacionalidad=${parametrosCuerpo.nacionalidad}&descripcion=${parametrosCuerpo.descripcion}&imagen=${parametrosCuerpo.imagen}`);
                }
                }else{
                    const mensajeError = 'DATOS INVALIDOS'
                    return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&nacionalidad=${parametrosCuerpo.nacionalidad}&descripcion=${parametrosCuerpo.descripcion}&imagen=${parametrosCuerpo.imagen}`);
                }
            }catch(e){
                console.error(e)
                throw new BadRequestException({
                    mensaje: 'Error validando datos'
                });
            }

        }


    @Get('editar/:id')
    async vistaEditarAutor(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
        @Session() session
    ) {
            session.usuario = parametrosConsulta.usuario
            session.roles = [parametrosConsulta.rol]
            const id = Number(parametrosRuta.id)
            let autorEncontrado;
            try {
                autorEncontrado = await this._autorService.buscarUno(id);
            }catch(error){
                console.error('Error del servidor');
                return res.redirect('/autor/menu?mensaje=Error buscando departamento');
            }
            if(autorEncontrado){
                return res.render(
                    'administracion/crearautor',
                    {
                        error: parametrosConsulta.error,
                        autor: autorEncontrado,
                        usuario: session.usuario,
                        roles: session.roles
                    }
                )
            }else{
                return res.redirect('/autor/menu?mensaje=departamento no encontrado')
            }
    }

    @Post('editar/:id')
    async editarAutor(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
        @Query() parametrosConsulta,
    ) {
        const autor = new AutorUpdateDto()
        autor.nombre = parametrosCuerpo.nombre;
        autor.nacionalidad=parametrosCuerpo.nacionalidad;
        autor.descripcion=parametrosCuerpo.descripcion;
        autor.imagen=parametrosCuerpo.imagen;
        try {
            const error: ValidationError[] = await validate(autor)
            if (error.length !== 0) {
                const autorEditado = {
                    id: Number(parametrosRuta.id),
                    nombre : parametrosCuerpo.nombre,
                    nacionalidad:parametrosCuerpo.nacionalidad,
                    descripcion:parametrosCuerpo.descripcion,
                    imagen:parametrosCuerpo.imagen,
                } as AutorEntity
                try {
                    await this._autorService.editarUno(autorEditado);
                    return res.redirect('/autor/menu?mensaje=Autor editado&usuario='+parametrosConsulta.usuario+'&rol='+parametrosConsulta.rol);
                }catch (error) {
                    console.error(error);
                    return res.redirect('/autor/menu?mensaje=Error editando autor');
                }
            } else {
                const mensajeError = 'DATOS INVALIDOS'
                return res.redirect('/autor/editar/'+parametrosRuta.id+'?error=' + mensajeError);
            }
        } catch (e) {
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
    }

    @Post('eliminar/:id')
    async eliminarAutor(
        @Param() parametrosRuta,
        @Res() res,
        @Query() parametrosConsulta
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._autorService.eliminarUno(id);
            return res.redirect('/autor/menu?mensaje=Autor eliminado&usuario='+parametrosConsulta.usuario+'&rol='+parametrosConsulta.rol)
        } catch (error) {
            console.log(error)
            return res.redirect('/autor/menu?eror=Error eliminando autor')
        }

    }
    }
