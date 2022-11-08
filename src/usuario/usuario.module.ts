import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bcrypt } from "../auth/bcrypt/bcrypt";
import { UsuarioController } from "./controller/usuario.controller";
import { UsuarioEntity } from "./entities/usuario.entity";
import { UsuarioServices } from "./service/usuario.service";


@Module({
    imports:[TypeOrmModule.forFeature([UsuarioEntity])],
    providers: [UsuarioServices, Bcrypt],
    controllers:[UsuarioController],
    exports: [UsuarioServices]
})
export class UsuarioModule{}