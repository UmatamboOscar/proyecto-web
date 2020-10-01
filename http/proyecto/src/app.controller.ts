import {
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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly _libroService: LibroService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('inicio')
  async inicio(
      @Res() res,
      @Query() parametrosConsulta,
      @Session() session
  ){
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
          if(busqueda){
          res.render(
              'inicio/inicio',
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
/*
      try {
          busqueda = await this._libroService.consultarLibros(parametrosConsulta.busqueda);
      } catch (error) {
          throw  new InternalServerErrorException('Error encontrando libro')
      }
      if (busqueda) {
          res.render(
              'inicio/inicio',
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
*/

  }

  @Get('registro')
  registro(
      @Res() res,
      @Query() parametrosConsulta
  ){
    res.render(
        'login/registro',
        {
            error: parametrosConsulta.error,
            nombre: parametrosConsulta.nombre,
            apellido: parametrosConsulta.apellido,
            cedula: parametrosConsulta.cedula,
            correo: parametrosConsulta.correo,
            telefono: parametrosConsulta.telefono,
            domicilio: parametrosConsulta.domicilio,
        }
    )
  }

    @Get('login')
    login(
        @Res() res,
        @Query() parametrosConsulta
    ) {
        res.render(
            'login/login',
            {
                error: parametrosConsulta.error,
            }
        )
    }

    @Get('logout')
    logout(
        @Session() session,
        @Res() response,
        @Req() request
    ){
        session.username = undefined;
        session.roles = undefined;
        request.session.destroy();
        return response.redirect('inicio')
    }

}
