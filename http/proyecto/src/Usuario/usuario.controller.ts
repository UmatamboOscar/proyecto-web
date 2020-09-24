import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {UsuarioUpdateDto} from "./dto/usuario.update-dto";
import {LibroService} from "../libro/libro.service";
import {UsuarioEntity} from "./usuario.entity";


@Controller('usuario')

export class UsuarioController {




}

//XML <usuario>GABY</nombre></usuario>
//JSON {"nombre": "GABY"}
//RESTful -JSON
//Ver todos
//http://localhost:3001/
//Get
//RESTful MASCOTA
//http://localhost:3001/mascota se recibe a todas las mascotas

//Ver uno
//http://localhost:3001/mascota/1 se ve a las mascotas con id=1

//Crear Uno
// POST http://localhost:3001/mascota/

//Editar Uno
//PUT http://localhost:3001/mascota/1

//Eliminar uno
//Delete http://localhost:3001/mascota/1
