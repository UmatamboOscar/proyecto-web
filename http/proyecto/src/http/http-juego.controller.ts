import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query, Req, Res, Headers,

} from "@nestjs/common";
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from 'class-validator';


// http://localhost:3001/juegos-http
@Controller('juegos-http')

export class HttpJuegoController {
    @Get('holi')
    @HttpCode(201)
    holiGet() {
        //throw new BadRequestException('No envia nada')
        //return 'Hola GET :P'
    }

    @Post('holi')
    @HttpCode(202)
    holiPost() {
        return 'Hola POST :P'
    }

    @Delete('holi')
    @HttpCode(204)
    @Header('Cache-control', 'none')
    @Header('EPN', 'prueba pruebas')
    holiDelete() {
        return 'Hola DELETE :P'
    }

    /*
    parametros de ruta
    http://localhost:3001/juegos-http/parametros-ruta/XX/gestion/YY
    */
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ) {
        console.log('Parametros', parametrosRuta);
        ///return 'ok';
        let edad = 0;
        let altura = 0;
        if (isNaN(parametrosRuta.edad) || isNaN(parametrosRuta.altura))
            throw new BadRequestException('No son numeros')
        else
            edad = Number(parametrosRuta.edad)
        altura = Number(parametrosRuta.altura)

        return edad + altura;
    }

    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDconsulta
    ) {
        console.log('parametrosDconsulta', parametrosDconsulta)
        if (parametrosDconsulta.nombre && parametrosDconsulta.apellido)
//            if (parametrosDconsulta.nombre=='Gab' && parametrosDconsulta.apellido=='Tala')
            return 'Yo soy: ' + parametrosDconsulta.nombre + '  ' + parametrosDconsulta.apellido;
        else
            return 'be happy';
    }

    @Post('parametros-cuerpo')
    async parametrosCuerpo(
        @Body() parametrosDcuerpo
    ) {
        //Promesas

        const mascotaValida = new MascotaCreateDto();
        mascotaValida.casada = parametrosDcuerpo.casada;
        mascotaValida.edad = parametrosDcuerpo.edad;
        mascotaValida.ligada = parametrosDcuerpo.ligada;
        mascotaValida.nombre = parametrosDcuerpo.nombre;
        mascotaValida.peso = parametrosDcuerpo.peso;
        try {
            const errores: ValidationError[] = await validate(mascotaValida);
            if (errores.length > 0) {
                console.error('Errores', errores);
                throw new BadRequestException('Error validando');
            } else {
                const mensajeCorrecto = {
                    mensaje: 'Se creo correctamente'
                };
                return mensajeCorrecto;
            }
        } catch (e) {
                //Sirve para hacer debug
                console.error('Error', e);
                throw new BadRequestException('Error Validaciones');
            }

            console.log('Parametros de cuerpo', parametrosDcuerpo)
            return 'Registro creado';

        }
    @Get("GuardarCookieInsegura")
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req,
        @Res() res,
    ){
        res.cookie(
            'galletaInsegura',
            'Tengo hambre'
        );
        const mensaje = {
            mensaje: 'ok'
        };
        res.send(mensaje);
    }

    @Get("GuardarCookieSegura")
    guardarCookieSegura(
        @Query() parametrosConsulta,
        @Req() req,
        @Res() res,
    ){
        res.cookie(
            'galleta Segura',
            'Web: 3',
            {secure:true
            }
        );
        const mensaje = {
            mensaje: 'ok'
        };
        res.send(mensaje);
    }

    @Get('mostrarCookies')
    mostrarCookies(
        @Req() req
    ){
        const mensaje ={
            sinFirmar: req.cookies,
            firmadas: req.signedCookies,
        };
        return mensaje;
    }

    @Get('guardarCookieFirmada')
    public guardarCookieFirmada(
        @Res() res,
        @Headers() headers //peticion
    ){
        res.header('Cabecera','Dinamica'); //cabeceras de respuesta

        res.cookie('firmada','poliburguer',{signed: true});
        res.cookie('firmada','poliburguer1',{signed: true});
        res.cookie('firmada','poliburguer2',{signed: true});
        res.cookie('firmada','poliburguer3',{signed: true});

        const mensaje = {
            mensaje: 'ok'
        };
        res.send(mensaje);
    }




    }













