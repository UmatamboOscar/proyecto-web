import {
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Query,
    Res, Session
} from "@nestjs/common";
import {LibroService} from "./libro.service";


@Controller('libro')
export class LibroController{
    constructor(
        private readonly _libroService: LibroService
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



/*


    @Get('inicio')
    async inicio(
        @Res() res,
        @Query() parametrosConsulta
    ) {
            let resultadoConsulta
            try {
                resultadoConsulta = await this._libroService.buscarTodos(parametrosConsulta.busqueda);
                console.log(resultadoConsulta);
            } catch (error) {
                throw  new InternalServerErrorException('Error encontrando libro')
            }
            if (resultadoConsulta) {
                res.render(
                    'inicio/inicio',
                    {
                        libros: resultadoConsulta,
                        parametrosConsulta: parametrosConsulta,
                    }
                )
            } else {
                throw new NotFoundException('No se encontraron departamentos')
            }
    }

*/
}
