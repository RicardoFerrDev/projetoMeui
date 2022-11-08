import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemController } from "./controller/postagem.controller";
import { PostagemServices } from "./service/postagem.service";
import { PostagemEntity } from "./entities/postagem.entity";


@Module({ 
    imports:[TypeOrmModule.forFeature([PostagemEntity])],
    providers: [PostagemServices],
        controllers: [PostagemController],
        exports: [TypeOrmModule]
})
export class PostagemModule {}