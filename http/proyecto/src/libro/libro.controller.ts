import {
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Query,
    Res, Session
} from "@nestjs/common";
import {LibroService} from "./libro.service";
import {CategoriaService} from "../categoria/categoria.service";
import {AutorService} from "../autor/autor.service";


@Controller('libro')
export class LibroController{
    constructor(
        private readonly _libroService: LibroService,
        private readonly _categoriaService: CategoriaService,
        private readonly _autorService: AutorService
    ) {
    }

    @Get('administracion')
    vista(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ){
        session.usuario = parametrosConsulta.usuario
        session.roles = [parametrosConsulta.rol]
        res.render(
            'administracion/administracion',
            {
                usuario: session.usuario,
                roles: session.roles
            }
        )
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
                        roles: session.roles
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
}
