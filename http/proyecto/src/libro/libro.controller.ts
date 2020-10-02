import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException, Post,
    Query,
    Res, Session
} from "@nestjs/common";
import {LibroService} from "./libro.service";
import {CategoriaService} from "../categoria/categoria.service";
import {AutorService} from "../autor/autor.service";
import {LibroEntity} from "./libro.entity";
import {LibroCreateDto} from "./dto/libro.create-dto";
import {validate, ValidationError} from "class-validator";
import {LibroCategoriaService} from "../libro_categoria/libro_categoria.service";
import {LibroAutorService} from "../libro_autor/libro_autor.service";
import {RolUsuarioEntity} from "../rol_usuario/rol_usuario.entity";
import {LibroAutorEntity} from "../libro_autor/libro_autor.entity";
import {LibroCategoriaEntity} from "../libro_categoria/libro_categoria.entity";


@Controller('libro')
export class LibroController{
    constructor(
        private readonly _libroService: LibroService,
        private readonly _categoriaService: CategoriaService,
        private readonly _autorService: AutorService,
        private readonly _libroCategoriaService: LibroCategoriaService,
        private readonly _libroAutorService: LibroAutorService
    ) {
    }

    @Get('administracion')
    async vista(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ) {
        session.usuario = parametrosConsulta.usuario
        session.roles = [parametrosConsulta.rol]
        let consultaCategorias
        try {
            consultaCategorias = await this._categoriaService.buscarTodos()
        } catch (error) {
            const mensajeError = 'Error en las categorias'
            res.redirect('/crear?error=' + mensajeError)
        }
        if(consultaCategorias) {
            res.render(
                'administracion/administracion',
                {
                    usuario: session.usuario,
                    roles: session.roles,
                    categorias: consultaCategorias
                }
            )
        }else{
            const mensajeError = 'Error categorias'
            res.redirect('/crear?error=' + mensajeError)
        }
    }

    @Get('menu')
    async menu(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ) {
        session.usuario = parametrosConsulta.usuario
        session.roles = [parametrosConsulta.rol]
        let resultadoConsulta
        let busqueda = await this._libroService.consultarLibros(parametrosConsulta.busqueda)
        let consultaCategorias = await this._categoriaService.buscarTodos()
        try {
            resultadoConsulta = await this._libroService.buscarTodos();
        } catch (error) {
            throw  new InternalServerErrorException('Error encontrando libro')
        }
        if (resultadoConsulta) {
            if (busqueda) {
                res.render(
                    'administracion/libros',
                    {
                        libros: resultadoConsulta,
                        parametrosConsulta: parametrosConsulta,
                        usuario: session.usuario,
                        roles: session.roles,
                        categorias: consultaCategorias
                    }
                )
            } else {
                throw new NotFoundException('No se encontraron libros')
            }
        }
    }

    @Get('crear')
    async crearLibro(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ) {
        session.usuario = parametrosConsulta.usuario
        session.roles = [parametrosConsulta.rol]
        let consultaAutores
        let consultaCategorias
        try {
            consultaAutores = await this._autorService.buscarTodos()
            consultaCategorias = await this._categoriaService.buscarTodos()
        }catch (error) {
            const mensajeError = 'Error buscando Autores y Categorias'
            res.redirect('/crear?error=' + mensajeError)
        }
        if( consultaCategorias && consultaAutores){
            res.render(
                'administracion/crearLibro',
                {
                    usuario: session.usuario,
                    roles: session.roles,
                    autores: consultaAutores,
                    categorias: consultaCategorias
                }
            )
        }else{
            const mensajeError = 'Error en el if'
            res.redirect('/crear?error=' + mensajeError)
        }
    }

    @Post('crear')
    async crearDepartamento(
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        const libro = new LibroCreateDto()
        libro.ISBN = parametrosCuerpo.ISBN
        libro.titulo = parametrosCuerpo.titulo
        libro.stock = Number(parametrosCuerpo.stock)
        libro.precio = Number(parametrosCuerpo.precio)
        libro.imagen = parametrosCuerpo.imagen
        libro.descripcion = parametrosCuerpo.descripcion
        let crearLibro
        let buscarAutor
        let buscarCategoria
        try {
            const error: ValidationError[] = await validate(libro)
            console.log(error)
            if(error.length == 0) {
                crearLibro = await this._libroService.crearNuevoLibro(parametrosCuerpo)
                buscarAutor = await this._autorService.buscarUnAutorPorNombre(parametrosCuerpo.autor)
                buscarCategoria = await this._categoriaService.buscarCategoriaPorNombre(parametrosCuerpo.categoria)
            }else{
                console.log('datos invalidos')
                res.redirect('/inicio')
            }
        }catch (error) {
            console.log('algo mal en los await')
        }
        let detalleLibroAutorCreado
        let detalleLibroCategoriaCreado
        let libroAutor: LibroAutorEntity;
        let libroCategoria: LibroCategoriaEntity;
        if(crearLibro && buscarCategoria && buscarAutor){
            let libroAutor1;
            libroAutor1 = {
                libro: crearLibro,
                autor: buscarAutor[0],
                idLibro: Number(crearLibro.id)
            }
            libroAutor = libroAutor1
            let libroCategoria1;
            libroCategoria1 = {
                libro: crearLibro,
                categoria: buscarCategoria[0],
                idLibro: Number(crearLibro.id)
            }
            libroCategoria = libroCategoria1
            detalleLibroAutorCreado = await this._libroAutorService.crearNuevoLibroAutor(libroAutor)
            detalleLibroCategoriaCreado = await  this._libroCategoriaService.crearNuevoLibroCategoria(libroCategoria)
        }else{
            console.log('error en detalles')
            res.redirect('/inicio')
        }
        if(detalleLibroCategoriaCreado && detalleLibroAutorCreado){
            console.log(detalleLibroAutorCreado)
            console.log(detalleLibroCategoriaCreado)
            console.log('todo chevere')
            res.redirect('/inicio')
        }
    }



}
