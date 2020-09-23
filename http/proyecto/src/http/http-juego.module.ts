

//@Nombre() -> Decorador
import {Module} from "@nestjs/common";
import {HttpJuegoController} from "./http-juego.controller";
import {AppController} from "../app.controller";
import {HttpDeberController} from "./deber/http-deber.controller";
import {HttpDeberModule} from "./deber/http-deber.module";

@Module({
    imports:[
    ],
    controllers:[
        HttpJuegoController,
    ],
    providers:[],
})

export class HttpJuegoModule{

}