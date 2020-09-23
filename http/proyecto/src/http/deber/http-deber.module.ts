import {Module} from "@nestjs/common";
import {HttpDeberController} from "./http-deber.controller";


@Module({
    imports:[],
    controllers:[
        HttpDeberController
    ],
    providers:[],
})

export class HttpDeberModule{

}