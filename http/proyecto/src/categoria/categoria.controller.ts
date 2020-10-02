import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException, Param, Post,
    Query,
    Res, Session
} from "@nestjs/common";
import {CategoriaService} from "./categoria.service";
import {validate, ValidationError} from "class-validator";
import {CategoriaCreateDto} from "./dto/categoria.create-dto";
import {CategoriaUpdateDto} from "./dto/categoria.update-dto";
import {CategoriaEntity} from "./categoria.entity";


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
        const busqueda = await this._categoriaService.buscarTodos()
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

    @Get('crear') // Controlador
    vistaCrearCategoria(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session
    ) {
        session.usuario = parametrosConsulta.usuario
        session.roles = [parametrosConsulta.rol]
        return res.render(
            'administracion/crearcategoria',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                usuario: session.usuario,
                roles: session.roles
            }
        )
    }

    @Post('crear')
    async crearCategoria(
        @Body() parametrosCuerpo,
        @Res() res,
        @Query() parametrosConsulta
    ) {
        const categoria = new CategoriaCreateDto()
        categoria.nombre = parametrosCuerpo.nombre
        try {
            const error: ValidationError[] = await validate(categoria)
            if (error.length == 0) {
                let respuesta;
                try {
                    respuesta = await this._categoriaService.crearNuevaCategoria(parametrosCuerpo);
                } catch (error) {
                    console.error(error);
                    const mensajeError = 'Creando nueva Categoria'
                    return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}`);
                }
                if (respuesta) {
                    return res.redirect('/categoria/menu?usuario='+parametrosConsulta.usuario+'&rol='+parametrosConsulta.rol)
                } else {
                    const mensajeError = 'Creando nuevo Categoria'
                    return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}`);
                }
            }else{
                const mensajeError = 'DATOS INVALIDOS'
                return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}`);
            }
        }catch(e){
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }

    }


    @Get('editar/:id')
    async vistaEditarCategoria(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
        @Session() session
    ) {
        session.usuario = parametrosConsulta.usuario
        session.roles = [parametrosConsulta.rol]
        const id = Number(parametrosRuta.id)
        let categoriaEncontrada;
        try {
            categoriaEncontrada = await this._categoriaService.buscarUno(id);
        }catch(error){
            console.error('Error del servidor');
            return res.redirect('/categoria/menu?mensaje=Error buscando categoria');
        }
        if(categoriaEncontrada){
            return res.render(
                'administracion/crearcategoria',
                {
                    error: parametrosConsulta.error,
                    categoria: categoriaEncontrada,
                    usuario: session.usuario,
                    roles: session.roles
                }
            )
        }else{
            return res.redirect('/categoria/menu?mensaje= categoria no encontrado')
        }
    }

    @Post('editar/:id')
    async editarCategoria(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
        @Query() parametrosConsulta,
    ) {
        const categoria = new CategoriaUpdateDto()
        categoria.nombre = parametrosCuerpo.categoria;
        try {
            const error: ValidationError[] = await validate(categoria)
            if (error.length == 0) {
                const categoriaEditada = {
                    id: Number(parametrosRuta.id),
                    nombre : parametrosCuerpo.nombre
                } as CategoriaEntity
                try {
                    await this._categoriaService.editarUno(categoriaEditada);
                    return res.redirect('/categoria/menu?mensaje=Categoria editada&usuario='+parametrosConsulta.usuario+'&rol='+parametrosConsulta.rol);
                }catch (error) {
                    console.error(error);
                    return res.redirect('/categoria/menu?mensaje=Error editando categoria');
                }
            } else {
                const mensajeError = 'DATOS INVALIDOS'
                return res.redirect('/categoria/editar/'+parametrosRuta.id+'?error=' + mensajeError);
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
        @Res() res,
        @Query() parametrosConsulta
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._categoriaService.eliminarUno(id);
            return res.redirect('/categoria/menu?mensaje=Categoria eliminada&usuario='+parametrosConsulta.usuario+'&rol='+parametrosConsulta.rol)
        } catch (error) {
            console.log(error)
            return res.redirect('/categoria/menu?eror=Error eliminando categoria')
        }

    }


}
