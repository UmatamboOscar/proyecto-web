import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Query,
    Req,
    Res,
    Session
} from '@nestjs/common';
import { AppService } from './app.service';
import {LibroService} from "./libro/libro.service";
import {CategoriaService} from "./categoria/categoria.service";


@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly _libroService: LibroService,
                private readonly _categoriasService: CategoriaService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('inicio')
    async inicio(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ) {
        session.usuario = parametrosConsulta.usuario
        session.roles = [parametrosConsulta.rol]
        let resultadoConsulta2
        let busqueda
        try {
            resultadoConsulta2 = await this._categoriasService.buscarTodos();
            busqueda = await this._libroService.consultarLibros(parametrosConsulta.busqueda);
        } catch (error) {
            throw  new InternalServerErrorException('Error encontrando libro')
        }
        if (resultadoConsulta2) {
            if (busqueda) {
                res.render(
                    'inicio/inicio',
                    {
                        categorias: resultadoConsulta2,
                        libros: busqueda,
                        parametrosConsulta: parametrosConsulta,
                        usuario: session.usuario,
                        roles: session.roles
                    })
                } else {
                    throw new NotFoundException('No se encontraron libros')
                }
            }
        }




    @Get('registro')
    async registro(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ) {
        let resultadoConsulta2
        try {
            resultadoConsulta2 = await this._categoriasService.buscarTodos();
        } catch (error) {
            throw  new InternalServerErrorException('Error encontrando categorias')
        }
        if (resultadoConsulta2){
            res.render(
            'login/registro',
            {
                categorias: resultadoConsulta2,
                error: parametrosConsulta.error,
                usuario: session.usuario,
                roles: session.roles,
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido,
                cedula: parametrosConsulta.cedula,
                correo: parametrosConsulta.correo,
                telefono: parametrosConsulta.telefono,
                domicilio: parametrosConsulta.domicilio,
            }
        )
} else {
    throw new NotFoundException('No se encontraron libros')
}

}

    @Get('login')
    async login(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ) {
        let resultadoConsulta2
        try {
            resultadoConsulta2 = await this._categoriasService.buscarTodos();
        } catch (error) {
            throw  new InternalServerErrorException('Error encontrando categorias')
        }
            if (resultadoConsulta2){
                    res.render(
                        'login/login',
                        {
                            categorias: resultadoConsulta2,
                            error: parametrosConsulta.error,
                            usuario: session.usuario,
                            roles: session.roles
                        }
                    )
                } else {
                    throw new NotFoundException('No se encontraron libros')
                }
            }


    @Get('logout')
    logout(
        @Session() session,
        @Res() response,
        @Req() request
    ) {
        session.username = undefined;
        session.roles = undefined;
        request.session.destroy();
        return response.redirect('inicio')
    }

    @Get('libros')
    async libros(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ) {
        session.usuario = parametrosConsulta.usuario
        session.roles = [parametrosConsulta.rol]
        let resultadoConsulta
        const busqueda = await this._libroService.consultarLibros(parametrosConsulta.busqueda)
        let consultaCategorias = await this._categoriasService.buscarTodos()
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



}
