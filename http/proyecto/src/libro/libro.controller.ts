import {
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Query,
    Res
} from "@nestjs/common";
import {LibroService} from "./libro.service";


@Controller('libro')
export class LibroController{
    constructor(
        private readonly _libroService: LibroService
    ) {
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
