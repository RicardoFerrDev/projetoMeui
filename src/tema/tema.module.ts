import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemaController } from "./controller/tema.controller";
import { Tema } from "./entities/tema.entity";
import { TemaServices } from "./service/tema.service";

@Module({
    imports:[TypeOrmModule.forFeature([Tema])],
    providers: [TemaServices],
    controllers:[TemaController],
    exports: [TypeOrmModule]
})
export class TemaModule{}