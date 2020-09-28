import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {UsuarioModule} from "./usuario/usuario.module";
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
import {RolUsuarioModule} from "./rol_usuario/rol_usuario.module";
import {RolUsuarioEntity} from "./rol_usuario/rol_usuario.entity";
import {LibroAutorModule} from "./libro_autor/libro_autor.module";
import {LibroAutorEntity} from "./libro_autor/libro_autor.entity";
import {LibroCategoriaEntity} from "./libro_categoria/libro_categoria.entity";
import {LibroCategoriaModule} from "./libro_categoria/libro_categoria.module";

@Module({
  imports: [
    UsuarioModule,
      RolModule,
      PedidoModule,
      DetalleModule,
      LibroModule,
      CategoriaModule,
      AutorModule,
      RolUsuarioModule,
      LibroAutorModule,
      LibroCategoriaModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'proyectoweb',
      entities: [
          UsuarioEntity,
          RolEntity,
          PedidoEntity,
          DetalleEntity,
          LibroEntity,
          CategoriaEntity,
          AutorEntity,
          RolUsuarioEntity,
          LibroAutorEntity,
          LibroCategoriaEntity
      ],
      synchronize: true,
      dropSchema: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

