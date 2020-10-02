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
import {LibroEntity} from "./libro/libro.entity";
import {FindManyOptions} from "typeorm";
import {CategoriaEntity} from "./categoria/categoria.entity";
import {AutorService} from "./autor/autor.service";


@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly _libroService: LibroService,
                private readonly _categoriasService: CategoriaService,
                private readonly _autorService: AutorService) {
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
        let buscarLibrosPorCategoria
        let libroEnt : LibroEntity
        let busqueda : Array<LibroEntity> = []
        try {
            resultadoConsulta2 = await this._categoriasService.buscarTodos();
            if(parametrosConsulta.busquedaCategoria){
                buscarLibrosPorCategoria = await this._categoriasService.buscarCategoriaPorNombre(parametrosConsulta.busquedaCategoria)
                for (const libro of buscarLibrosPorCategoria[0].libros) {
                    libroEnt = await this._libroService.buscarUno(libro.idLibro)
                    busqueda.push(libroEnt)
                }
            }else {
                busqueda = await this._libroService.consultarLibros(parametrosConsulta.busqueda);
            }
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
        const consultaCategorias = await this._categoriasService.buscarTodos()
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

    @Get('autores')
    async autores(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ) {
        session.usuario = parametrosConsulta.usuario
        session.roles = [parametrosConsulta.rol]
        let resultadoConsulta
        let resultadoConsulta2
        try {
            resultadoConsulta = await this._categoriasService.buscarTodos();
            resultadoConsulta2 = await this._autorService.buscarTodos();
        } catch (error) {
            throw  new InternalServerErrorException('Error encontrando autores')
        }
        if (resultadoConsulta2) {
                res.render(
                    'inicio/autores',
                    {
                        categorias: resultadoConsulta,
                        autores: resultadoConsulta2,
                        parametrosConsulta: parametrosConsulta,
                        usuario: session.usuario,
                        roles: session.roles
                    })
            } else {
                throw new NotFoundException('No se encontraron autores')
            }
        }
    }


