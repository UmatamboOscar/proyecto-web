import {Controller, Get, Query, Res} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('inicio')
  inicio(
      @Res() res,
  ){
    res.render(
        'inicio/inicio'
    )
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


}
