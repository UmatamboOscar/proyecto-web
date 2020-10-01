import {
    Controller,
        Get,
        InternalServerErrorException,
        NotFoundException,
        Query,
        Res, Session
} from "@nestjs/common";
import {AutorService} from "./autor.service";
import {CategoriaService} from "../categoria/categoria.service";


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
        let busqueda = await this._autorService.buscarTodos()
        let consultaCategoria = await this._categoriaService.buscarTodos()
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
            throw new NotFoundException('No se encontraron libros')
        }
    }

}
