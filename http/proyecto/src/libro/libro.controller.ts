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
import {CategoriaUpdateDto} from "../categoria/dto/categoria.update-dto";
import {CategoriaEntity} from "../categoria/categoria.entity";
import {LibroUpdateDto} from "./dto/libro.update-dto";


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
        const busqueda = await this._libroService.consultarLibros(parametrosConsulta.busqueda)
        const consultaCategorias = await this._categoriaService.buscarTodos()
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

    @Get('editar/:id')
    async vistaEditarLibro(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
        @Session() session
    ) {
        session.usuario = parametrosConsulta.usuario
        session.roles = [parametrosConsulta.rol]
        const id = Number(parametrosRuta.id)
        let libroEncontrado;
        let consultaAutores
        let consultaCategorias;
        try {
            consultaAutores = await this._autorService.buscarTodos()
            libroEncontrado = await this._libroService.buscarUno(id);
            consultaCategorias = await this._categoriaService.buscarTodos()
        }catch(error){
            console.error('Error del servidor');
            return res.redirect('/libro/menu?mensaje=Error buscando libro');
        }
        if(libroEncontrado){
            return res.render(
                'administracion/crearLibro',
                {
                    error: parametrosConsulta.error,
                    libro: libroEncontrado,
                    usuario: session.usuario,
                    roles: session.roles,
                    autores: consultaAutores,
                    categorias: consultaCategorias
                }
            )
        }else{
            const mensajeError = 'Error en el if'
            return res.redirect('/libro/menu?mensaje= libro no encontrado')
        }
    }

    @Post('editar/:id')
    async editarLibro(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const libro = new LibroUpdateDto()
        libro.ISBN = parametrosCuerpo.ISBN
        libro.titulo = parametrosCuerpo.titulo
        libro.stock = Number(parametrosCuerpo.stock)
        libro.precio = Number(parametrosCuerpo.precio)
        libro.imagen = parametrosCuerpo.imagen
        libro.descripcion = parametrosCuerpo.descripcion
        libro.titulo = parametrosCuerpo.libro;
        try {
            const error: ValidationError[] = await validate(libro)
            if (error.length !== 0) {
                const libroEditado = {
                    id: Number(parametrosRuta.id),
                    ISBN: parametrosCuerpo.ISBN,
                    titulo : parametrosCuerpo.titulo,
                    stock: Number(parametrosCuerpo.stock),
                    precio: Number(parametrosCuerpo.precio),
                    imagen:parametrosCuerpo.imagen,
                    descripcion: parametrosCuerpo.descripcion
                } as LibroEntity
                try {
                    await this._libroService.editarUno(libroEditado);
                    return res.redirect('/libro/menu?mensaje=Libro editado');
                }catch (error) {
                    console.error(error);
                    return res.redirect('/libro/menu?mensaje=Error editando libro');
                }
            } else {
                const mensajeError = 'DATOS INVALIDOS'
                return res.redirect('/libro/editar/'+parametrosRuta.id+'?error=' + mensajeError);
            }
        } catch (e) {
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
    }

    @Post('eliminar/:id')
    async eliminarCategoria(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._libroService.eliminarUno(id);
            return res.redirect('/libro/menu?mensaje=Libro eliminado')
        } catch (error) {
            console.log(error)
            return res.redirect('/libro/menu?eror=Error eliminando libro')
        }

    }

}
