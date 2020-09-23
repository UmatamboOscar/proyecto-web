
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get, Head,
    Header,
    Headers,
    HttpCode,
    Param,
    Post,
    Put,
    Query, Req, Res
} from "@nestjs/common";
import {Validate, validate, ValidationError} from "class-validator";
import {DeberCreateDto} from "./deber.create-dto";
import {DeberUsrCreateDto} from "./deberUsr.create-dto";

@Controller('deber-calculadora')

export class HttpDeberController{
    puntaje=100;
    disponible=false;

    @Get('/sumar/:n2')
    @HttpCode(200)
    async sumar(
        @Query() parametroConsulta, //n1
        @Param() parametroRuta, //n2
        @Req() req,
        @Res() res
    ){
        if(this.verificarUsuario(req)){
            const valores=new DeberCreateDto()
            valores.valor1= Number(parametroConsulta.n1)
            valores.valor2=Number(parametroRuta.n2)
            try{
                console.log('Parametro consulta: '+parametroConsulta.n1+'  Parametro ruta:'+parametroRuta.n2)
                const errores:ValidationError[]=await validate(valores)
                if(errores.length>0){
                    console.error('Errores',errores)
                    throw new BadRequestException("Datos incorrectos")
                }else{
                    const total=valores.valor1+valores.valor2
                    this.verificarPuntaje(total)
                    if(this.disponible==true){
                        res.send({
                            mensaje:'Total suma:'+total+ ' '+req.cookies.usuario+' ya no tiene puntos. Se reiniciara a 100'
                        });
                    }else{
                        res.send({
                            mensaje: 'Total suma:'+total+' le quedan: '+this.puntaje + 'puntos'
                        });
                    }
                }
            }catch(e){
                throw new BadRequestException("Error de validacion de datos");
            }
        }else{
            res.send({
                mensaje: 'Registre su username'
            });
        }
    }


    @Put('/restar')
    @HttpCode(201)
    async restar(
        @Body() parametroCuerpo, //n1 y
        @Query() parametrosConsulta,// n2
        @Req() req,
        @Res() res
    ){
        if(this.verificarUsuario(req)){
            const valores= new DeberCreateDto()
            valores.valor1=parametroCuerpo.n1
            valores.valor2=Number(parametrosConsulta.n2)
            try{
                const errores:ValidationError[]=await validate(valores)
                if(errores.length>0){
                    console.error('Errores',errores)
                    throw new BadRequestException("Datos ingresados incorrectos")
                }else{
                    const total =valores.valor1-valores.valor2
                    this.verificarPuntaje(total)
                    if(this.disponible==true){
                        res.send({
                            mensaje:'Total resta: '+total+ ' ' +req.cookies.usuario+' ya no tiene puntos. Se reiniciara a 100'
                        });
                    }else{
                        res.send({
                            mensaje: 'Total resta:'+total+' le quedan: '+this.puntaje + ' puntos'
                        });
                    }
                }
            }catch (e){
                throw new BadRequestException("Error de validacion de datos");
            }
        } else {
            return 'No estan guardadas las cookies'
        }
  }

    @Delete('/multiplicar/:n2')
    @HttpCode(200)
    async multiplicar(
        @Headers() cabeceras, //n1 y
        @Param() parametrosRuta,// n2
        @Req() req,
        @Res() res
    ){
        if(this.verificarUsuario(req)){
            const valores=new DeberCreateDto()
            valores.valor1= Number(cabeceras.n1)
            valores.valor2=Number(parametrosRuta.n2)
            try{
                const errores:ValidationError[]=await validate(valores)
                if(errores.length>0){
                    console.error('Errores',errores)
                    throw new BadRequestException("Datos ingresados incorrectos")
                }else{
                    const total=valores.valor1 * valores.valor2
                    this.verificarPuntaje(total)
                    if(this.disponible==true){
                        res.send({
                            mensaje:'Total multiplicacion: '+total+ ' ' +req.cookies.usuario+' ya no tiene puntos. Se reiniciara a 100'
                        });
                    }else{
                        res.send({
                            mensaje: 'Total resta:'+total+' le quedan: '+this.puntaje + ' puntos'
                        });
                    }
                }
            }catch (e){
                throw new BadRequestException("Error de validacion de datos");
            }

        }else{
            return 'No se guardaron las cookies'
        }
    }

    @Post('/dividir/:n1')
    @HttpCode(201)
    async dividir(
        @Param() parametrosRuta, //n1 y
        @Headers() cabecera,// n2
        @Req() req,
        @Res() res
    ){
        const disponible=this.verificarUsuario(req)
        if(disponible){
            const valores=new DeberCreateDto()
            valores.valor1= Number(parametrosRuta.n1)
            valores.valor2=Number(cabecera.n2)
            try{
                const errores:ValidationError[]=await validate(valores)
                if(errores.length>0){
                    console.error('Errores',errores)
                    throw new BadRequestException("Datos ingresados incorrectos")
                }else{
                    if(valores.valor2==0){
                        console.log('Error: No es posible dividir para 0')
                        throw new BadRequestException('Error: No es posible dividir para 0')
                    }else{
                        const total=valores.valor1/valores.valor2
                        this.verificarPuntaje(total)
                        if(this.disponible==true){
                            res.send({
                                mensaje:'Total division: '+total+ ' ' +req.cookies.usuario +' ya no tiene puntos. Se reiniciara a 100'
                            });
                        }else{
                            res.send({
                                mensaje: 'Total division:'+total+' le quedan: '+this.puntaje + ' puntos'
                            });
                        }
                    }
                }
            }catch (e){
                throw new BadRequestException("Error de validacion de datos");
            }
        }else{
            return 'No se han guardado las cookies'
        }
    }


    @Get('guardarCookieNombre')
    guardarCookieNombre(
        @Query() parametroConsulta,
        @Res() res,

    ) {
        const username = parametroConsulta.usuario
        if(username){
            res.cookie('usuario', username,{signed:false})
            res.cookie('puntaje',this.puntaje,{signed:true})
            res.send("Usuario guardado exitosamente")
        }else{
            throw new BadRequestException('Ingrese datos de usuario valido')
        }
    }
    verificarUsuario(
        @Req() req
    ){
        const cookie=req.cookies
        if(cookie.usuario){
            return true
        }else{
            return false
        }
    }

    verificarPuntaje(respuesta){
        const temporal=this.puntaje-Math.abs(respuesta)
        if(temporal<=0){
            this.puntaje=100;
            this.disponible=true;
        }else{
            this.puntaje=temporal
            this.disponible=false
        }
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

}