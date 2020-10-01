import {
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Query,
    Res, Session
} from "@nestjs/common";
import {CategoriaService} from "./categoria.service";


@Controller('categoria')
export class CategoriaController{
    constructor(
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
        let busqueda = await this._categoriaService.buscarTodos()
            if (busqueda) {
                res.render(
                    'administracion/categorias',
                    {
                        categorias: busqueda,
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
