import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./Usuario/usuario.entity";
import {UsuarioModule} from "./Usuario/usuario.module";
import {RolEntity} from "./rol/rol.entity";
import {PedidoEntity} from "./pedido/pedido.entity";
import {DetalleEntity} from "./detallePedido/detalle.entity";
import {LibroEntity} from "./libro/libro.entity";
import {CategoriaEntity} from "./categoria/categoria.entity";
import {AutorEntity} from "./autor/autor.entity";
import {RolModule} from "./rol/rol.module";
import {PedidoModule} from "./pedido/pedido.module";
import {DetalleModule} from "./detallePedido/detalle.module";
import {LibroModule} from "./libro/libro.module";
import {CategoriaModule} from "./categoria/categoria.module";
import {AutorModule} from "./autor/autor.module";

@Module({
  imports: [
    UsuarioModule,
      RolModule,
      PedidoModule,
      DetalleModule,
      LibroModule,
      CategoriaModule,
      AutorModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0120saul',
      database: 'proyectoweb',
      entities: [
        UsuarioEntity,
          RolEntity,
          PedidoEntity,
          DetalleEntity,
          LibroEntity,
          CategoriaEntity,
          AutorEntity
      ],
      synchronize: true,
      dropSchema: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
